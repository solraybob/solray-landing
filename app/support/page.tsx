import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support — Solray",
  description: "Help and contact for Solray. Billing, your subscription, your data, and how to reach us.",
};

const CONTACT = "hello@solray.ai";

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "How does the free trial and price work?",
    a: (
      <>
        Solray starts with three days free. After that it is $23 a month, a single
        plan with everything included. You can cancel anytime before the trial
        ends and you will not be charged.
      </>
    ),
  },
  {
    q: "How do I manage or cancel my subscription?",
    a: (
      <>
        If you subscribed on iPhone, manage it in your Apple account under
        Subscriptions. On Android, manage it in Google Play under Subscriptions.
        If you subscribed on the web, manage it from your account settings in the
        app. Cancelling stops the next renewal and you keep access until the
        period you paid for ends.
      </>
    ),
  },
  {
    q: "My reading looks off. Can I fix my birth details?",
    a: (
      <>
        Every reading is calculated from your exact birth date, time, and place,
        so a wrong birth time can shift the chart. You can update your birth
        details in the app and your chart recalculates. If anything still looks
        wrong, email us and we will look at it with you.
      </>
    ),
  },
  {
    q: "What happens to my data?",
    a: (
      <>
        Your chart and your conversations are yours. We do not sell your data.
        See our <a href="/legal">privacy policy and terms</a> for the full
        detail, and email us if you want your data exported or deleted.
      </>
    ),
  },
];

export default function SupportPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "transparent",
        color: "var(--pearl)",
        padding: "72px 24px 96px",
      }}
    >
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <p
          style={{
            fontSize: 12,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--wisteria)",
            marginBottom: 14,
          }}
        >
          Support
        </p>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 300,
            fontSize: 40,
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          We are here to help.
        </h1>
        <p style={{ color: "var(--pearl-dim)", fontSize: 16, lineHeight: 1.6, marginTop: 18 }}>
          The fastest way to reach a person is email. Write to us at{" "}
          <a href={`mailto:${CONTACT}`} style={{ color: "var(--amber)" }}>
            {CONTACT}
          </a>{" "}
          and we will get back to you. Below are answers to the most common
          questions.
        </p>

        <div style={{ marginTop: 44 }}>
          {faqs.map((f) => (
            <div
              key={f.q}
              style={{ borderTop: "1px solid rgba(236,231,221,0.12)", padding: "22px 0" }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 400,
                  fontSize: 21,
                  margin: "0 0 8px",
                }}
              >
                {f.q}
              </h2>
              <p style={{ color: "var(--pearl-dim)", fontSize: 15.5, lineHeight: 1.65, margin: 0 }}>
                {f.a}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 40,
            paddingTop: 24,
            borderTop: "1px solid rgba(236,231,221,0.12)",
            fontSize: 14,
            color: "var(--moss-dim, #5f7163)",
          }}
        >
          Solray, by Bobby ehf., Iceland. Contact{" "}
          <a href={`mailto:${CONTACT}`} style={{ color: "var(--amber)" }}>
            {CONTACT}
          </a>
          . <a href="/" style={{ color: "var(--amber)" }}>Back to solray.ai</a>
        </div>
      </div>
    </main>
  );
}
