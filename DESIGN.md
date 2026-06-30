---
version: alpha
name: MiniMax-design-analysis
description: An elderly-health analytics dashboard whose brand language borrows from MiniMax — stark monochrome canvas, DM Sans typography, pill-shaped CTAs, and vibrant product-color cards for data moments. The base canvas is pure white; `#0a0b0d` (ink) is the primary brand voltage. DM Sans runs every surface, from 80px hero displays to 12px micro labels. Buttons are universally pill-shaped (`rounded.full`) with a black-pill primary system. Cards split into vibrant data-highlight cards (32px corner softening) and quiet white documentation cards (16px).

colors:
  primary: "#0a0b0d"
  canvas: "#ffffff"
  surface: "#f7f7f7"
  surface-soft: "#f2f4f7"
  hairline: "#e4e7ec"
  hairline-soft: "#f0f2f5"
  ink: "#0a0b0d"
  ink-strong: "#000000"
  charcoal: "#475467"
  slate: "#667085"
  steel: "#98a2b3"
  stone: "#b3b9c6"
  muted: "#d0d5dd"
  on-primary: "#ffffff"
  on-dark: "#ffffff"
  on-dark-soft: "rgba(255,255,255,0.8)"

  # Product identity colors — reserved for data-card moments
  brand-coral: "#f44837"
  brand-magenta: "#e83e8c"
  brand-blue: "#2667ff"
  brand-blue-deep: "#1c4ed8"
  brand-blue-700: "#1750b2"
  brand-cyan: "#22d3ee"
  brand-blue-200: "#dbeafe"
  brand-purple: "#7c3aed"
  brand-green: "#059669"

  # Semantic
  semantic-up: "#16a34a"
  semantic-down: "#dc2626"
  success-bg: "#dcfce7"
  success-text: "#166534"
  error-border: "#d45656"

typography:
  hero-display:
    fontFamily: "'DM Sans', 'Inter', -apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: 80px
    fontWeight: 600
    lineHeight: 1.10
    letterSpacing: -2px
  display-lg:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: 56px
    fontWeight: 600
    lineHeight: 1.10
    letterSpacing: -1.5px
  heading-lg:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1.20
    letterSpacing: -1px
  heading-md:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.5px
  heading-sm:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.30
    letterSpacing: 0
  card-title:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.40
    letterSpacing: 0
  subtitle:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.50
    letterSpacing: 0
  body-md:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: 0
  body-md-bold:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.50
    letterSpacing: 0
  body-sm:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: 0
  body-sm-medium:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.50
    letterSpacing: 0
  caption:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.70
    letterSpacing: 0
  caption-bold:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.50
    letterSpacing: 0
  micro:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: 0
  button-md:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.40
    letterSpacing: 0

rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  xxl: 20px
  xxxl: 24px
  hero: 32px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 24px
  xxl: 32px
  xxxl: 40px
  section-sm: 48px
  section: 64px
  section-lg: 80px
  hero: 96px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: 11px 24px
    height: auto
  button-primary-pressed:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
  button-primary-disabled:
    backgroundColor: "{colors.hairline}"
    textColor: "{colors.muted}"
    rounded: "{rounded.full}"
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: 11px 24px
    height: auto
    border: 1px solid "{colors.ink}"
  button-tertiary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: 11px 24px
    border: 1px solid "{colors.hairline}"
  card-base:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.charcoal}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xl}"
    border: 1px solid "{colors.hairline}"
  card-feature:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.charcoal}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xxl}"
  product-card-coral:
    backgroundColor: "{colors.brand-coral}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.hero}"
    padding: "{spacing.xxl}"
  product-card-blue:
    backgroundColor: "{colors.brand-blue}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.hero}"
    padding: "{spacing.xxl}"
  data-highlight-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.xxl}"
    padding: "{spacing.lg}"
    border: 1px solid "{colors.hairline}"
  badge-new:
    backgroundColor: "{colors.brand-coral}"
    textColor: "{colors.on-dark}"
    typography: "{typography.caption-bold}"
    rounded: "{rounded.full}"
    padding: 4px 10px
  badge-success:
    backgroundColor: "{colors.success-bg}"
    textColor: "{colors.success-text}"
    typography: "{typography.caption-bold}"
    rounded: "{rounded.full}"
    padding: 4px 10px
  badge-pill:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.charcoal}"
    typography: "{typography.caption-bold}"
    rounded: "{rounded.full}"
    padding: 4px 10px
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm-medium}"
    height: 64px
    borderBottom: 1px solid "{colors.hairline-soft}"
  hero-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.hero-display}"
  footer-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-sm}"
    padding: "{spacing.section} {spacing.xxl}"
  footer-link:
    backgroundColor: transparent
    textColor: "{colors.muted}"
    typography: "{typography.body-sm}"
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm} {spacing.md}"
    height: 40px
    border: 1px solid "{colors.hairline}"
  segmented-tab:
    backgroundColor: transparent
    textColor: "{colors.steel}"
    typography: "{typography.body-sm-medium}"
    padding: "{spacing.md} {spacing.lg}"
  segmented-tab-active:
    textColor: "{colors.ink}"
    borderBottom: "2px solid {colors.ink}"
---
