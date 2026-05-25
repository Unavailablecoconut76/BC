---
name: Luminous Ledger
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#45dfa4'
  on-secondary: '#003825'
  secondary-container: '#00bd85'
  on-secondary-container: '#00452e'
  tertiary: '#adc6ff'
  on-tertiary: '#002e6a'
  tertiary-container: '#71a1ff'
  on-tertiary-container: '#00367a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#68fcbf'
  secondary-fixed-dim: '#45dfa4'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#004395'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is engineered for a high-stakes, blockchain-based land registration platform tailored for the Indian market. It bridges the gap between institutional authority and modern fintech innovation. The visual narrative centers on **Security, Transparency, and Permanence**.

The style is **Corporate Modern with Tech-Infused Accents**. It utilizes a deep, multi-layered dark mode to signify a "vault-like" environment where data is immutable. High-contrast emerald accents represent growth, legality, and "go" (action), while the refined use of slate neutrals maintains a professional, government-grade sobriety. The interface prioritizes clarity and density management to handle complex legal data without overwhelming the user.

## Colors

The palette is anchored in a **Deep Slate System**. 
- **The Core:** The background hierarchy uses `#020617` for structural navigation (sidebars) and `#0F172A` for primary work surfaces, providing a receding depth that makes content pop.
- **Accents:** Emerald (`#10B981`) is reserved for primary actions and "Verified" states, echoing the color of trust in financial contexts. 
- **Data Visualization:** Use the Info Blue and Warning Yellow sparingly for system alerts and pending blockchain confirmations. 
- **Interactivity:** Use the Background Light (`#334155`) for hover states and input backgrounds to provide a tactile feel against the darker canvas.

## Typography

This design system utilizes **Inter** for its neutral, highly legible Swiss-style characteristics, ensuring that dense legal text remains accessible. 

- **Hierarchy:** Use Bold weights for all headings to establish a clear information architecture. 
- **Body Text:** Use Slate-300 (`#CBD5E1`) for primary body text to reduce eye strain against the dark background, avoiding pure white.
- **Data/Hashes:** All blockchain addresses, transaction hashes, and parcel IDs must use **JetBrains Mono** in Emerald-400. This distinct visual style separates "system data" from "human language."
- **Labels:** Use uppercase for labels and small captions with slightly increased letter spacing to enhance scanability in property detail panels.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model.
- **Sidebar:** Fixed at 280px, using the Darkest background (`#020617`).
- **Main Content:** A 12-column fluid grid with a max-width of 1280px for readability. 
- **Margins:** 24px on mobile, 48px on desktop to ensure a "premium" feel with generous whitespace.
- **Rhythm:** An 8px linear scale is used for all internal component spacing, while 16px and 24px are the standard for section padding and gutter widths.
- **Density:** High-density grids are permitted for "Land Ledger" tables, but must be balanced by wide margins in the surrounding page layout.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** rather than heavy shadows.
- **Level 0:** Base page background (`#0F172A`).
- **Level 1:** Cards and section containers (`#1E293B`). These feature a 1px border in `#334155` to define edges against the dark background.
- **Level 2:** Modals, popovers, and dropdowns. These use a slightly lighter fill or a subtle 15% opacity black shadow to lift them off the Level 1 surface.
- **Interaction:** Hover states on interactive cards should transition the border color from Slate-700 to Emerald-400/50, providing a "glow" effect that suggests blockchain activity.

## Shapes

The shape language is **Structured and Modern**.
- **Cards:** 12px radius creates a friendly but professional container for property details.
- **Action Elements:** 8px for buttons provides a precise, geometric feel.
- **Inputs:** 6px for form fields to maintain a tighter, more functional aesthetic for data entry.
- **Badges:** Full pill-shape (999px) for status indicators (e.g., "Verified", "Pending") to distinguish them from actionable buttons.

## Components

### Buttons
- **Primary:** Background `#10B981`, White text. On hover, darken to `#059669`.
- **Secondary:** Background `#1E293B`, 1px Border `#34D399`, Text `#34D399`. 
- **Ghost:** No background, Text `#94A3B8`, for low-priority actions like "Cancel".

### Input Fields
- **Default:** Background `#334155`, Border `#475569`, Text White.
- **Focus:** Border becomes `#34D399` with a 2px outer glow (ring) of the same color at 30% opacity.
- **Monospace Input:** Used specifically for entering Private Keys or Transaction IDs.

### Status Badges
- **Structure:** Pill shape, 20% opacity background of the semantic color (Success/Warning/Error/Info) with 100% opacity text.
- **Iconography:** Include a small 12px icon (Check, Alert, Clock) inside the badge for accessibility.

### Cards
- **Property Card:** Features a top-aligned image (if available) or a map snippet, followed by a `#1E293B` content area. Headlines should be white, body text in Slate-300.
- **Blockchain Receipt:** A specialized card variant with a dashed border and monospaced font for the "Block Hash" section.

### Icons
- Use **Lucide** icons. Set stroke width to 2px for a balanced weight. 
- Icons used within cards or navigation should match the section's accent color or the Text Muted (`#94A3B8`) color when inactive.