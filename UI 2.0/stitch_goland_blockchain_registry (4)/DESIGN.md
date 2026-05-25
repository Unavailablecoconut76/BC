---
name: Institutional Integrity
colors:
  surface: '#fcf8ff'
  surface-dim: '#dad7f3'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f2ff'
  surface-container: '#efecff'
  surface-container-high: '#e8e5ff'
  surface-container-highest: '#e2e0fc'
  on-surface: '#1a1a2e'
  on-surface-variant: '#44474f'
  inverse-surface: '#2f2e43'
  inverse-on-surface: '#f2efff'
  outline: '#747780'
  outline-variant: '#c4c6d0'
  surface-tint: '#425e91'
  primary: '#002452'
  on-primary: '#ffffff'
  primary-container: '#1b3a6b'
  on-primary-container: '#89a5dd'
  inverse-primary: '#acc7ff'
  secondary: '#98471f'
  on-secondary: '#ffffff'
  secondary-container: '#fd9668'
  on-secondary-container: '#752d06'
  tertiary: '#002c16'
  on-tertiary: '#ffffff'
  tertiary-container: '#004425'
  on-tertiary-container: '#68b484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#acc7ff'
  on-primary-fixed: '#001a40'
  on-primary-fixed-variant: '#294678'
  secondary-fixed: '#ffdbcd'
  secondary-fixed-dim: '#ffb596'
  on-secondary-fixed: '#360f00'
  on-secondary-fixed-variant: '#793009'
  tertiary-fixed: '#a5f4bf'
  tertiary-fixed-dim: '#8ad7a4'
  on-tertiary-fixed: '#00210f'
  on-tertiary-fixed-variant: '#00522e'
  background: '#fcf8ff'
  on-background: '#1a1a2e'
  surface-variant: '#e2e0fc'
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
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
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
  label-sm:
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
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 32px
  xl: 48px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style
The design system is engineered for high-stakes digital infrastructure. It balances the authoritative weight of a government institution with the technical precision of modern fintech. The aesthetic is **Corporate / Modern**, leaning heavily into a "document-centric" philosophy where information density is managed through clear hierarchy and generous, intentional whitespace.

The target audience includes citizens, legal professionals, and government officials. The UI must evoke a sense of permanence, security, and absolute transparency. By utilizing a warm, paper-like background and traditional navy accents, the system feels established rather than disruptive, grounding blockchain technology in a familiar, trustworthy context.

## Colors
This design system utilizes a palette inspired by official archives and natural Indian earth tones. The primary **Deep Navy** provides institutional authority, while the **Terracotta** secondary accent is used sparingly for call-to-actions and highlights, nodding to traditional clay seals and saffron motifs.

- **Backgrounds:** Use the warm off-white for the main canvas to reduce eye strain and mimic high-quality bond paper.
- **Surfaces:** Pure white is reserved for interactive cards and modals to create a clear "layer" above the page.
- **Status Tones:** Use muted variants of green, amber, and red for system feedback to maintain a professional, calm environment.

## Typography
The typography system prioritizes legibility and structure. **Inter** is the workhorse for all UI elements, providing a neutral, systematic feel. 

- **Headings:** Always rendered in the primary Deep Navy to anchor the page.
- **Labels:** Use the `label-sm` style for form headers and metadata descriptors. The slight tracking and uppercase styling distinguish them from interactive text.
- **Technical Data:** Wallet addresses, transaction hashes, and survey/plot numbers must use **JetBrains Mono**. This ensures that similar characters (0/O, 1/I) are distinguishable, which is critical for land records.
- **Mobile Scaling:** For mobile devices, `display-lg` should scale down to 32px, and `headline-lg` to 24px to prevent horizontal overflow.

## Layout & Spacing
The design system employs a **Fixed Grid** model for desktop to maintain the "document" feel, centering content in a maximum 1280px container.

- **Grid:** A 12-column system for desktop (24px gutters) and a 4-column system for mobile.
- **Rhythm:** Spacing follows a 4px baseline, but primary components should gravitate towards `md (24px)` for internal padding to maintain an airy, professional density.
- **Alignment:** Content is strictly left-aligned to mirror legal document layouts. Centered layouts should be reserved only for success states or splash screens.

## Elevation & Depth
Depth is achieved through **Tonal Layers** and subtle, realistic shadows. The system avoids "floating" elements, preferring components that feel physically seated on the warm background.

- **Level 0 (Background):** #F7F5F2.
- **Level 1 (Cards):** #FFFFFF with a 1px #E0D9D0 border and a soft 4px blur shadow at 5% opacity.
- **Level 2 (Modals/Popovers):** These use a higher elevation shadow (12px blur, 10% opacity) and are accompanied by a 60% opacity overlay of #1A1A2E with a 4px backdrop blur to focus the user’s attention on the task at hand.

## Shapes
The shape language is "Soft-Institutional." Elements are neither aggressively sharp nor overly playful.

- **Primary Radius:** 8px for buttons and input fields to feel modern and accessible.
- **Container Radius:** 12px for cards and modals to provide a clear distinction from the smaller interactive elements they contain.
- **Pills:** Status indicators and chips use a fully rounded (pill) radius to distinguish them from clickable buttons.

## Components
Consistent implementation of these components ensures the platform feels like a singular, unified record-keeping system.

- **Buttons:** 44px standard height. Primary buttons use #1B3A6B with white text. Secondary buttons use a #E0D9D0 border and navy text. No gradients.
- **Input Fields:** Use #FFFFFF background with a 1px #D1CBC4 border. On focus, the border shifts to #1B3A6B with a subtle 2px outer glow.
- **Status Pills:** Backgrounds should be 10% opacity of the status color (e.g., Green for Success) with 100% opacity text of the same color.
- **Code Chips:** For hash data and IDs, use the #F0EDE8 background, 4px radius, and JetBrains Mono text.
- **Lists:** Data lists should use #E0D9D0 horizontal dividers (1px) with 16px vertical padding between rows to ensure clarity in dense land records.
- **Modals:** Must feature a clear header with the `headline-md` style and a distinct close action.