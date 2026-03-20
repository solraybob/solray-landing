# BUILD_LOG_REDESIGN.md

## Redesign: Japanese Way — 2026-03-20

### Summary

Full visual redesign of the Solray AI landing page. Old aesthetic: deep space purple/navy with star field animation. New aesthetic: deep forest green with warm amber accents. Minimal, intentional, nothing wasted.

### Color Palette

| Role | Color |
|---|---|
| Background | `#050f08` / `#071510` |
| Primary accent (amber) | `#e8821a` |
| Secondary accent (gold) | `#c9891a` |
| Text primary | `#f5f0e8` |
| Text secondary | `#8a9e8d` |
| Card background | `#0a1f12` |
| Borders | `#1a3020` |

### Changes Made

**Removed:**
- `StarField.tsx` component no longer imported (file preserved but unused)
- All cosmic/space color references (`#050510`, lavender, navy)
- Gradient CTAs, glow effects, box shadows
- Decorative dividers and ornamental elements in Hero
- Alternating step layout in HowItWorks (replaced with clean linear list)

**Added:**
- `/logo.jpg` (circular) in Hero and Footer
- Clean `borderTop: 1px solid #1a3020` between all sections
- `borderTop: 2px solid #e8821a` on Difference cards (amber top-border design)
- Amber step numbers in HowItWorks

**Updated:**
- `tailwind.config.ts`: replaced cosmic/gold/lavender palette with forest/amber/ink
- `globals.css`: new background color, scrollbar, placeholder color
- `page.tsx`: removed StarField import and dynamic load
- All components: new color values throughout

### Typography
- Headlines: Cormorant Garamond (unchanged — already in use)
- Body: Inter (unchanged)

### Build

```
✓ Compiled successfully
✓ 6/6 static pages generated
Route /: 6.25 kB | First Load JS: 93.5 kB
/api/waitlist: still functional (Supabase integration untouched)
```

### Git
- Commit: `f7f1115` — "Redesign: Japanese Way color palette and philosophy"  
- Pushed to: `origin/main`
