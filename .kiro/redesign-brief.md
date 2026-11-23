# Locksy redesign brief (for page-level restyling)

The homepage has been redesigned in a dark, minimal, premium style modelled on the
SecureZen Framer template (https://securezen.framer.website/). Every other page must now
match it. Your job is to RESTYLE the files you are assigned. Do not change what the
page says or does.

## Study these first (they are the reference implementation)
- `app/globals.css`: tokens and utility classes (`btn-primary`, `btn-secondary`, `btn-lg`, `btn-sm`,
  `surface`, `eyebrow`, `eyebrow-dot`, `kbd`, `bg-grid`, `doc-body`, `text-highlight`, `bg-highlight`).
- `components/page-shell.tsx`: shared building blocks: `PageHero`, `Breadcrumbs`, `PageSection`,
  `Panel`, `IconTile`, `DocLayout`, `DocSection`, `RelatedLinks`, `Callout`. USE THESE.
- `components/section-heading.tsx`: eyebrow + H2 + lead paragraph.
- Homepage sections for patterns: `components/features.tsx`, `security.tsx`, `comparison.tsx`,
  `pricing.tsx`, `faq.tsx`, `testimonials.tsx`, `cta-section.tsx`, `see-it-in-action.tsx`.

## Visual rules
- Colours: only theme tokens: `bg-background`, `bg-card`, `bg-muted`, `bg-popover`, `text-foreground`,
  `text-muted-foreground`, `border-border`, and the single accent `text-highlight` / `bg-highlight/10..15`
  / `ring-highlight/40`. Status colours (red/amber/emerald) are allowed ONLY for small semantic
  indicators (a strength meter, a "breached" badge, a pass/fail dot), at low intensity
  (e.g. `bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/25`).
- Pages must work in BOTH dark (default) and light theme. Never hard-code `bg-white`, `bg-neutral-900`,
  `text-white` on surfaces (except text on an intentionally solid element).
- Headings: `font-semibold` (never `font-black`/`font-extrabold`), tight leading, `text-balance`.
  H1 ≈ `text-4xl sm:text-5xl md:text-6xl`; H2 ≈ `text-3xl md:text-4xl/5xl`; card titles `text-lg font-semibold`.
- Body: `text-muted-foreground`, `leading-relaxed`, 15–16px. Labels `text-sm`/`text-xs`.
- Cards: `surface` class (rounded-3xl, hairline border, card bg) or `rounded-2xl border border-border bg-card`.
  Nested inner boxes: `rounded-xl border border-border bg-background`.
- Buttons: `btn-primary` (solid pill) for the single main action, `btn-secondary` (outline pill) otherwise.
  Inline links: `text-foreground underline underline-offset-4` or `text-muted-foreground hover:text-foreground`.
- Icons: lucide-react line icons, `h-4/h-5`, coloured `text-highlight` or `text-muted-foreground`,
  optionally inside `IconTile`. Check an icon exists in `node_modules/lucide-react/dist/esm/icons/<kebab>.js`
  before using a new one.
- Spacing: sections `py-12 md:py-16` (or `PageSection`), page width `max-w-6xl` (text-heavy: `max-w-3xl`).
  Page tops use `PageHero` (which applies `page-top-offset` for the fixed header).

## REMOVE all of these ("AI slop" patterns)
- Gradient text (`bg-clip-text text-transparent` with gradients) of any kind.
- Glowing/blurred blobs (`blur-3xl` circles, `animate-pulse` decorations), grid-line backgrounds made with
  `bg-[linear-gradient(...)]`, `drop-shadow` glows. (The only allowed glow is the subtle
  `style={{ background: "radial-gradient(..., var(--glow), transparent 70%)" }}` used in page-shell/CTA.)
- Rainbow / multi-colour gradients: `from-violet-*`, `fuchsia`, `from-primary to-secondary`, per-card
  `color: "from-blue-500 to-cyan-500"` gradient tiles, gradient buttons, gradient top bars.
- Emoji used as icons or decoration (🔒 ✨ 🚀 ⭐ 💎 🔥 ✅ ❌ etc.). Replace with lucide icons or nothing.
  (Emoji that are part of user-facing data, e.g. country flags inside a real tool result, may stay.)
- `shadow-2xl`/`shadow-xl`/coloured shadows on cards, `hover:-translate-y-*`, `hover:scale-*`,
  `group-hover:scale-110` on icons, pulsing badges, `animate-ping` dots.
- ALL-CAPS heavy badges, `font-black`, `tracking-tighter` everywhere.
- Hype copy in decorative UI (badges like "🔥 Most Popular", "Ultimate", "Revolutionary"). You may
  shorten/neutralise a *decorative badge label*, but do not rewrite body content.

## Hard constraints
- Preserve ALL text content of body copy, headings' meaning, lists, tables, FAQs, legal wording,
  dates, prices, numbers, and links/hrefs. Do not invent new facts, stats, testimonials or claims.
- Preserve ALL logic: state, hooks, handlers, API calls, form behaviour, analytics, `"use client"`,
  exports, props interfaces, metadata exports, JSON-LD scripts, `id` attributes and anchor targets.
- Keep `<Header />` and `<Footer />` usage. Keep shared components (`CTASection`, `SupportChatCTA`,
  `ProUpgradeCard`) where they are used. They are already restyled; don't edit them.
- Only edit the files assigned to you. Do NOT edit `app/globals.css`, `components/page-shell.tsx`,
  `components/header.tsx`, `components/footer.tsx`, or any other shared file. If you truly need a
  shared change, describe it in your final report instead.
- Accessibility: keep semantic headings order, `aria-*` attributes, alt text, focus states.
- When finished, run `npx tsc --noEmit` from `d:\locksy-website` and fix any errors in YOUR files.
  Then grep your files for `bg-clip-text|blur-3xl|animate-pulse|font-black|from-violet|fuchsia|from-primary to-secondary|shadow-2xl`
  and emoji, and make sure nothing remains (except allowed cases above).
- Do NOT start a dev server (the user already runs one on http://localhost:3000). You may fetch pages
  from it to check they return 200.

## Final report
Reply with: files changed, any content you had to drop or shorten (should be none), anything you
could not restyle and why, and any shared change you'd recommend.
