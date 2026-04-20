# Design Brief

## Direction

Cutie π — A premium creative design studio with minimal, modern agency aesthetic and refined constraint.

## Tone

Refined minimalism emphasizing clean lines, bold typography, and strategic use of Electric Blue accent to convey professionalism and creative confidence.

## Differentiation

Strong typographic hierarchy paired with smooth fade-in animations and sparingly-applied electric blue accents create a memorable, modern agency presence.

## Color Palette

| Token      | OKLCH            | Role                              |
| ---------- | ---------------- | --------------------------------- |
| background | 0.98 0.008 230   | Off-white, clean spaces           |
| foreground | 0.18 0.015 230   | Dark charcoal text, high contrast  |
| card       | 1.0 0.0 0        | Pure white surfaces               |
| primary    | 0.55 0.2 265     | Electric blue accent              |
| accent     | 0.55 0.2 265     | CTA hover, interactive highlights |
| muted      | 0.94 0.01 230    | Light grey, secondary backgrounds |

## Typography

- Display: Space Grotesk — headings, hero text, section titles
- Body: Figtree — paragraphs, labels, UI text
- Scale: hero `text-6xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl md:text-5xl font-bold tracking-tight`, label `text-xs font-semibold uppercase tracking-widest`, body `text-base md:text-lg`

## Elevation & Depth

Minimal shadow hierarchy with white card surfaces elevated against light background via subtle borders and spacing, accent shadows reserved for hover states.

## Structural Zones

| Zone    | Background | Border              | Notes                           |
| ------- | ---------- | ------------------- | ------------------------------- |
| Header  | bg-card    | border-b border-border | Navigation, sticky positioning |
| Content | bg-background | —             | Alternating muted sections      |
| Footer  | bg-muted   | border-t border-border | Contact info, social links      |

## Spacing & Rhythm

Conservative, spacious sections (4-6rem gaps) with 1.5rem content padding; micro-spacing via `gap-4` for component groups.

## Component Patterns

- Buttons: `bg-primary text-primary-foreground rounded-lg` + `hover:glow-accent transition-smooth`
- Cards: `bg-card border border-border rounded-lg p-6` + `fade-in`
- Badges: `bg-accent/10 text-accent rounded-full px-3 py-1` + uppercase label styling

## Motion

- Entrance: Fade-in on page load, component stagger via section `animation-delay`
- Hover: All interactive elements trigger `transition-smooth` with `glow-accent` on buttons
- Decorative: Pulsing accent on CTAs, smooth scroll-triggered fade-ins

## Constraints

- No dark mode in phase 1; light mode only
- Electric blue accent used only on CTAs, active states, and key interactive elements
- Typography scale strictly enforced via utility classes
- No gradients or full-page backgrounds; depth via layering and cards only

## Signature Detail

Glow effect on button hover using Electric Blue shadow (`box-shadow: 0 0 20px oklch(var(--accent) / 0.3)`) — subtle, non-aggressive, conveys interactivity without distraction.
