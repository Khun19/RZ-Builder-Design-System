/* GENERATED FROM tokens.json -- DO NOT EDIT. Run scripts/build-tokens.mjs. */
// Portable design tokens (colors as hex). Web consumes the theme via
// src/index.css; mobile (Expo) and any other platform import this object so the
// whole product shares one source of truth.
export const tokens = {
  "color": {
    "light": {
      "background": "#FFFFFF",
      "foreground": "#101114",
      "border": "#858C96",
      "card": "#F5F6F7",
      "cardForeground": "#101114",
      "popover": "#FFFFFF",
      "popoverForeground": "#101114",
      "primary": "#343941",
      "primaryForeground": "#F5F6F7",
      "secondary": "#E4E7EB",
      "secondaryForeground": "#101114",
      "muted": "#F5F6F7",
      "mutedForeground": "#5E646E",
      "accent": "#D7DCE2",
      "accentForeground": "#101114",
      "destructive": "#B42318",
      "destructiveForeground": "#FFFFFF",
      "input": "#A6ADB7",
      "ring": "#343941",
      "chart1": "#1D4ED8",
      "chart2": "#047857",
      "chart3": "#854D0E",
      "chart4": "#B42318",
      "chart5": "#5E646E",
      "sidebar": "#F5F6F7",
      "sidebarForeground": "#101114",
      "sidebarBorder": "#A6ADB7",
      "sidebarPrimary": "#343941",
      "sidebarPrimaryForeground": "#F5F6F7",
      "sidebarAccent": "#E4E7EB",
      "sidebarAccentForeground": "#101114",
      "sidebarRing": "#343941"
    },
    "dark": {
      "background": "#090A0C",
      "foreground": "#F5F6F7",
      "border": "#42464E",
      "card": "#17191D",
      "cardForeground": "#F5F6F7",
      "popover": "#24272D",
      "popoverForeground": "#F5F6F7",
      "primary": "#C7CCD2",
      "primaryForeground": "#090A0C",
      "secondary": "#24272D",
      "secondaryForeground": "#F5F6F7",
      "muted": "#24272D",
      "mutedForeground": "#A6ADB7",
      "accent": "#343941",
      "accentForeground": "#F5F6F7",
      "destructive": "#F87171",
      "destructiveForeground": "#090A0C",
      "input": "#42464E",
      "ring": "#C7CCD2",
      "chart1": "#60A5FA",
      "chart2": "#34D399",
      "chart3": "#FBBF24",
      "chart4": "#F87171",
      "chart5": "#A6ADB7",
      "sidebar": "#101114",
      "sidebarForeground": "#F5F6F7",
      "sidebarBorder": "#30343B",
      "sidebarPrimary": "#C7CCD2",
      "sidebarPrimaryForeground": "#090A0C",
      "sidebarAccent": "#24272D",
      "sidebarAccentForeground": "#F5F6F7",
      "sidebarRing": "#C7CCD2"
    }
  },
  "primitive": {
    "color": {
      "neutral": {
        "0": "#FFFFFF",
        "50": "#F5F6F7",
        "100": "#E4E7EB",
        "200": "#D7DCE2",
        "300": "#C7CCD2",
        "400": "#A6ADB7",
        "500": "#858C96",
        "600": "#5E646E",
        "700": "#343941",
        "800": "#24272D",
        "850": "#17191D",
        "900": "#101114",
        "950": "#090A0C"
      }
    }
  },
  "semantic": {
    "light": {
      "background": {
        "primary": "#FFFFFF",
        "secondary": "#F5F6F7"
      },
      "surface": {
        "default": "#F5F6F7",
        "elevated": "#FFFFFF"
      },
      "text": {
        "primary": "#101114",
        "secondary": "#5E646E",
        "muted": "#5E646E",
        "inverse": "#FFFFFF"
      },
      "border": {
        "default": "#858C96",
        "subtle": "#D7DCE2"
      },
      "action": {
        "primary": "#343941",
        "primaryHover": "#24272D",
        "primaryText": "#F5F6F7"
      },
      "focus": {
        "ring": "#343941"
      }
    },
    "dark": {
      "background": {
        "primary": "#090A0C",
        "secondary": "#101114"
      },
      "surface": {
        "default": "#17191D",
        "elevated": "#24272D"
      },
      "text": {
        "primary": "#F5F6F7",
        "secondary": "#B8BEC7",
        "muted": "#A6ADB7",
        "inverse": "#090A0C"
      },
      "border": {
        "default": "#42464E",
        "subtle": "#30343B"
      },
      "action": {
        "primary": "#C7CCD2",
        "primaryHover": "#E4E7EB",
        "primaryText": "#090A0C"
      },
      "focus": {
        "ring": "#C7CCD2"
      }
    }
  },
  "status": {
    "light": {
      "success": "#047857",
      "warning": "#854D0E",
      "error": "#B42318",
      "info": "#1D4ED8",
      "neutral": "#5E646E"
    },
    "dark": {
      "success": "#34D399",
      "warning": "#FBBF24",
      "error": "#F87171",
      "info": "#60A5FA",
      "neutral": "#A6ADB7"
    }
  },
  "sizing": {
    "icon": {
      "sm": "16px",
      "md": "20px",
      "lg": "24px"
    },
    "control": {
      "sm": "36px",
      "md": "44px",
      "lg": "48px"
    },
    "border": {
      "thin": "1px",
      "focus": "2px"
    }
  },
  "motion": {
    "fast": "120ms",
    "normal": "200ms",
    "slow": "300ms"
  },
  "breakpoint": {
    "smallMobile": "320px",
    "mobile": "360px",
    "tablet": "768px",
    "desktop": "1024px",
    "wideDesktop": "1440px"
  },
  "fontFamily": {
    "sans": [
      "Inter",
      "Noto Sans Myanmar",
      "Myanmar Text",
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
  "typography": {
    "scale": {
      "display": {
        "fontSize": "40px",
        "lineHeight": "48px"
      },
      "headingXL": {
        "fontSize": "32px",
        "lineHeight": "40px"
      },
      "headingLG": {
        "fontSize": "24px",
        "lineHeight": "32px"
      },
      "headingMD": {
        "fontSize": "20px",
        "lineHeight": "28px"
      },
      "bodyLG": {
        "fontSize": "18px",
        "lineHeight": "28px"
      },
      "bodyMD": {
        "fontSize": "16px",
        "lineHeight": "24px"
      },
      "bodySM": {
        "fontSize": "14px",
        "lineHeight": "20px"
      },
      "label": {
        "fontSize": "14px",
        "lineHeight": "20px"
      },
      "caption": {
        "fontSize": "12px",
        "lineHeight": "16px"
      }
    },
    "fontWeight": {
      "regular": "400",
      "medium": "500",
      "semibold": "600",
      "bold": "700"
    }
  },
  "radius": "12px",
  "radiusScale": {
    "xs": "4px",
    "sm": "8px",
    "md": "12px",
    "lg": "16px",
    "xl": "24px",
    "pill": "999px"
  },
  "spacing": "4px",
  "spacingScale": {
    "0": "0px",
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "20px",
    "6": "24px",
    "8": "32px",
    "10": "40px",
    "12": "48px",
    "16": "64px"
  }
} as const;

export type Tokens = typeof tokens;
export default tokens;
