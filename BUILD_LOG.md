# Solray AI Landing Page — Build Log

**Date:** 2026-03-20  
**Build status:** ✅ SUCCESS

---

## What was built

A complete Next.js 14 (App Router) landing page for Solray AI, deployed-ready for Vercel.

### Pages & Routes
- `/` — Main landing page (statically generated)
- `/api/waitlist` — POST endpoint (server-rendered on demand)

### Components
| Component | Type | Notes |
|-----------|------|-------|
| `StarField.tsx` | Client | Canvas-based star field with twinkling animation; dynamically imported (ssr: false) |
| `Hero.tsx` | Client | Full-screen hero with gold CTA hover effect; requires client for event handlers |
| `Difference.tsx` | Server | 3-column "not a horoscope / live engines / Higher Self" section |
| `FourScreens.tsx` | Server | 4 feature cards (Today, Chat, Souls, Chart) with CSS hover |
| `HowItWorks.tsx` | Server | 3-step alternating timeline |
| `Waitlist.tsx` | Server | Section wrapper (contains WaitlistForm) |
| `WaitlistForm.tsx` | Client | Controlled form with fetch to /api/waitlist |
| `Footer.tsx` | Server | Wordmark, domain, tagline |

### API Route
`app/api/waitlist/route.ts`:
- Accepts POST `{ name, email }`
- Uses `pg` (node-postgres) with `DATABASE_URL` env var
- Auto-creates `waitlist` table if missing (idempotent)
- Deduplicates by email (`ON CONFLICT DO NOTHING`)
- SSL enabled in production, disabled in dev

---

## Build output

```
Route (app)                              Size     First Load JS
┌ ○ /                                    2.81 kB        90.1 kB
├ ○ /_not-found                          875 B          88.1 kB
└ ƒ /api/waitlist                        0 B                0 B
```

Total first load JS: ~90kB — lean for a landing page.

---

## Issues encountered & resolved

### 1. ESLint: unescaped entities
**Error:** `'` must be escaped in JSX  
**Fix:** Replaced `'` with `&apos;` in Hero and WaitlistForm

### 2. Event handlers in Server Component (Hero)
**Error:** `onMouseEnter`/`onMouseLeave` can't be passed to Client Component props  
**Fix:** Added `"use client"` directive to `Hero.tsx`

### 3. Static page generation timeout (StarField)
**Error:** Build worker timed out 3 times during page generation  
**Root cause:** StarField uses `requestAnimationFrame` in a canvas loop; when included as a regular import it interfered with static generation even though it had `"use client"`  
**Fix:** Wrapped with `dynamic(() => import("./components/StarField"), { ssr: false })` in `page.tsx`

---

## Environment variables needed

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (set in Vercel project settings) |

See `.env.local.example` for format.

---

## Supabase setup (manual step)

The API route auto-creates the table, but you can also pre-create it:

```sql
CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Deploy to Vercel

1. Push repo to GitHub
2. Import in Vercel dashboard
3. Add `DATABASE_URL` environment variable (from Supabase → Settings → Database → Connection string)
4. Deploy — Vercel auto-detects Next.js via `vercel.json`

---

## Design notes

- **Fonts:** Cormorant Garamond (headings) + Inter (body) via `next/font/google`
- **Colors:** `#050510` background, `#c9a84c` gold, `#9b8ec4` lavender
- **Star field:** ~200–400 stars depending on viewport; soft twinkling with occasional gold-tinted larger stars
- **Mobile:** All sections fully responsive via Tailwind grid/flex
