/* GENERATED FROM tokens.json -- DO NOT EDIT. Run scripts/build-tokens.mjs. */
// Portable design tokens (colors as hex). Web consumes the theme via
// src/index.css; mobile (Expo) and any other platform import this object so the
// whole product shares one source of truth.
export const tokens = {
  "color": {
    "light": {
      "background": "#edf3f8",
      "foreground": "#101b28",
      "border": "#c9d6e2",
      "card": "#f8fbfe",
      "cardForeground": "#101b28",
      "popover": "#f8fbfe",
      "popoverForeground": "#101b28",
      "primary": "#176797",
      "primaryForeground": "#f8fcff",
      "secondary": "#dce7f0",
      "secondaryForeground": "#19364d",
      "muted": "#e3ebf2",
      "mutedForeground": "#526779",
      "accent": "#d4f6ff",
      "accentForeground": "#064563",
      "destructive": "#b4233e",
      "destructiveForeground": "#ffffff",
      "input": "#c1d1df",
      "ring": "#168cc5",
      "chart1": "#176797",
      "chart2": "#12a8c5",
      "chart3": "#536f8a",
      "chart4": "#4b91cc",
      "chart5": "#1a596b",
      "sidebar": "#e5edf4",
      "sidebarForeground": "#253e53",
      "sidebarBorder": "#c9d6e2",
      "sidebarPrimary": "#176797",
      "sidebarPrimaryForeground": "#ffffff",
      "sidebarAccent": "#d4f6ff",
      "sidebarAccentForeground": "#064563",
      "sidebarRing": "#168cc5"
    },
    "dark": {
      "background": "#05080d",
      "foreground": "#eaf4ff",
      "border": "#243b51",
      "card": "#0b1420",
      "cardForeground": "#eaf4ff",
      "popover": "#0b1420",
      "popoverForeground": "#eaf4ff",
      "primary": "#72caff",
      "primaryForeground": "#05111c",
      "secondary": "#142538",
      "secondaryForeground": "#d5eaff",
      "muted": "#101d2b",
      "mutedForeground": "#9ab0c5",
      "accent": "#0c344b",
      "accentForeground": "#b9f3ff",
      "destructive": "#a92e45",
      "destructiveForeground": "#fff5f6",
      "input": "#2d4a63",
      "ring": "#4bdfff",
      "chart1": "#72caff",
      "chart2": "#34d9ff",
      "chart3": "#b7c7d8",
      "chart4": "#4288c5",
      "chart5": "#39b9a8",
      "sidebar": "#080f18",
      "sidebarForeground": "#e2effb",
      "sidebarBorder": "#1d3348",
      "sidebarPrimary": "#31c9f5",
      "sidebarPrimaryForeground": "#03131c",
      "sidebarAccent": "#10263a",
      "sidebarAccentForeground": "#d8f8ff",
      "sidebarRing": "#4bdfff"
    }
  },
  "fontFamily": {
    "sans": [
      "Space Grotesk",
      "sans-serif"
    ],
    "serif": [
      "Georgia",
      "serif"
    ],
    "mono": [
      "JetBrains Mono",
      "monospace"
    ]
  },
  "radius": "0.625rem",
  "spacing": "0.25rem"
} as const;

export type Tokens = typeof tokens;
export default tokens;
