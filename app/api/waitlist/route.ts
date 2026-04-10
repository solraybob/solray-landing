import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import { Resend } from "resend";

let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    pool = new Pool({
      connectionString,
      ssl:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : false,
    });
  }
  return pool;
}

const EMAIL_1_HTML = (name: string) => `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a; line-height: 1.7;">

<p>Hi ${name},</p>

<p>You're on the Solray waitlist. That means something.</p>

<p>You were born as a specific moment in the solar system. The chart is not a symbol. It is a record. Solray reads that record every day and speaks directly to you from it.</p>

<p>Solray is a spiritual companion powered by live astrology, Human Design, and Gene Keys calculations. Not generic horoscopes. Not one-size-fits-all readings. Every insight is calculated fresh from your birth data and the sky right now.</p>

<p>You'll get early access before we open to the public. We'll be in touch.</p>

<p>The Solray Team</p>

</body>
</html>`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const db = getPool();

    // Ensure table exists
    await db.query(`
      CREATE TABLE IF NOT EXISTS waitlist (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    const result = await db.query(
      `INSERT INTO waitlist (name, email) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING RETURNING id`,
      [name.trim(), email.trim().toLowerCase()]
    );

    // Only send welcome email for new signups (not duplicates)
    const isNewSignup = result.rowCount && result.rowCount > 0;

    if (isNewSignup && process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "Solray <onboarding@resend.dev>",
          to: [`${name.trim()} <${email.trim().toLowerCase()}>`],
          subject: "You're on the list.",
          html: EMAIL_1_HTML(name.trim()),
        });
      } catch (emailError) {
        // Log but don't fail the signup if email fails
        console.error("Welcome email failed:", emailError);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Waitlist error:", error);

    if (error instanceof Error && error.message.includes("DATABASE_URL")) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
