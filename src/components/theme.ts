
import {
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        arcadia: {
          50: { value: "#FFF6E1" },
          100: { value: "#FFC2C2" },
          200: { value: "#E6A4B4" },
          300: { value: "#D98499" },
          400: { value: "#C54B61" },
          500: { value: "var(--arc-brand-indigo)" },
          600: { value: "var(--arc-brand-indigo-dark)" },
          700: { value: "#34334A" },
          800: { value: "#3D1F34" },
          900: { value: "#29202C" },
          950: { value: "#1C1D1F" },
        },
      },
    },

    semanticTokens: {
      colors: {
        // Arcadia color palette for Chakra components
        arcadia: {
          solid: { value: "{colors.arcadia.400}" },
          contrast: { value: "#FFFFFF" },
          fg: { value: "{colors.arcadia.100}" },
          muted: { value: "{colors.arcadia.600}" },
          subtle: { value: "{colors.arcadia.700}" },
          emphasized: { value: "{colors.arcadia.500}" },
          focusRing: { value: "{colors.arcadia.400}" },
        },

        surface: {
          canvas: { value: "var(--arc-surface-canvas)" },
          base: { value: "var(--arc-surface-base)" },
          elevated: { value: "var(--arc-surface-elevated)" },
          card: { value: "var(--arc-surface-card)" },
          overlay: { value: "var(--arc-surface-overlay)" },
        },

        text: {
          primary: { value: "var(--arc-text-primary)" },
          warm: { value: "var(--arc-text-warm)" },
          muted: { value: "var(--arc-text-muted)" },
          subtle: { value: "var(--arc-text-subtle)" },
          inverse: { value: "var(--arc-text-inverse)" },
          faded: { value: "var(--arc-text-faded)" },
        },

        border: {
          subtle: { value: "var(--arc-border-subtle)" },
          default: { value: "var(--arc-border-default)" },
          strong: { value: "var(--arc-border-strong)" },
        },

        interactive: {
          link: { value: "var(--arc-interactive-link)" },
          focus: { value: "var(--arc-interactive-focus)" },
          selected: { value: "var(--arc-interactive-selected)" },
          hover: { value: "var(--arc-interactive-hover)" },
        },

        status: {
          success: { value: "var(--arc-status-success)" },
          warning: { value: "var(--arc-status-warning)" },
          error: { value: "var(--arc-status-error)" },
          info: { value: "var(--arc-status-info)" },
        },

        accent: {
          gold: { value: "var(--arc-accent-gold)" },
          blue: { value: "var(--arc-accent-blue)" },
          purple: { value: "var(--arc-accent-purple)" },
        },
      },
    },
  },
})

export const arcadia = createSystem(defaultConfig, config)
