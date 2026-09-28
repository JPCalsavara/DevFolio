import { createTheme } from "@mui/material/styles";
import { ThemeConfig, ThemePreset, themeConfig } from "@/data/portfolioData";

export const THEME_PRESETS: Record<ThemePreset, Omit<ThemeConfig, "preset">> = {
  "blue-terminal": {
    mode: "dark",
    primaryMain: "#38BDF8",
    primaryLight: "#7DD3FC",
    primaryDark: "#0284C7",
    secondaryMain: "#60A5FA",
    secondaryLight: "#93C5FD",
    secondaryDark: "#2563EB",
    backgroundDefault: "#030712",
    backgroundPaper: "#071324",
    textPrimary: "#F8FAFC",
    textSecondary: "#94A3B8",
    borderRadius: 14,
  },
  "emerald-tech": {
    mode: "dark",
    primaryMain: "#10B981",
    primaryLight: "#34D399",
    primaryDark: "#059669",
    secondaryMain: "#34D399",
    secondaryLight: "#6EE7B7",
    secondaryDark: "#059669",
    backgroundDefault: "#02120A",
    backgroundPaper: "#062417",
    textPrimary: "#F0FDF4",
    textSecondary: "#A7F3D0",
    borderRadius: 14,
  },
  "purple-cyberpunk": {
    mode: "dark",
    primaryMain: "#A855F7",
    primaryLight: "#C084FC",
    primaryDark: "#7E22CE",
    secondaryMain: "#F43F5E",
    secondaryLight: "#FB7185",
    secondaryDark: "#E11D48",
    backgroundDefault: "#0C0418",
    backgroundPaper: "#180930",
    textPrimary: "#FAF5FF",
    textSecondary: "#D8B4FE",
    borderRadius: 14,
  },
  "amber-glow": {
    mode: "dark",
    primaryMain: "#F59E0B",
    primaryLight: "#FBBF24",
    primaryDark: "#D97706",
    secondaryMain: "#FB923C",
    secondaryLight: "#FDBA74",
    secondaryDark: "#EA580C",
    backgroundDefault: "#120902",
    backgroundPaper: "#221205",
    textPrimary: "#FFFBEB",
    textSecondary: "#FDE68A",
    borderRadius: 14,
  },
  "monochrome-slate": {
    mode: "dark",
    primaryMain: "#94A3B8",
    primaryLight: "#CBD5E1",
    primaryDark: "#64748B",
    secondaryMain: "#38BDF8",
    secondaryLight: "#7DD3FC",
    secondaryDark: "#0284C7",
    backgroundDefault: "#090D16",
    backgroundPaper: "#131B2E",
    textPrimary: "#F8FAFC",
    textSecondary: "#94A3B8",
    borderRadius: 14,
  },
  custom: {
    mode: "dark",
    primaryMain: "#4F9CF9",
    primaryLight: "#7DB9FF",
    primaryDark: "#1A6FD8",
    secondaryMain: "#38BDF8",
    secondaryLight: "#7DD3FC",
    secondaryDark: "#0284C7",
    backgroundDefault: "#05101E",
    backgroundPaper: "#0B1A2E",
    textPrimary: "#EDF2FF",
    textSecondary: "#8BAFC9",
    borderRadius: 14,
  },
};

export function buildPortfolioTheme(config: ThemeConfig = themeConfig) {
  const isLight = config.mode === "light";
  return createTheme({
    palette: {
      mode: config.mode,
      primary: {
        main: config.primaryMain,
        light: config.primaryLight || config.primaryMain,
        dark: config.primaryDark || config.primaryMain,
      },
      secondary: {
        main: config.secondaryMain,
        light: config.secondaryLight || config.secondaryMain,
        dark: config.secondaryDark || config.secondaryMain,
      },
      background: {
        default: config.backgroundDefault,
        paper: config.backgroundPaper,
      },
      text: {
        primary: config.textPrimary,
        secondary: config.textSecondary,
      },
      divider: isLight ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.1)",
      success: { main: config.secondaryMain },
      error: { main: "#F87171" },
      warning: { main: "#FBBF24" },
    },
    shape: {
      borderRadius: config.borderRadius ?? 14,
    },
    typography: {
      fontFamily: "var(--font-inter)",
      h1: {
        fontFamily: "var(--font-sora)",
        fontWeight: 800,
        letterSpacing: "-0.04em",
        lineHeight: 1.1,
      },
      h2: {
        fontFamily: "var(--font-sora)",
        fontWeight: 700,
        letterSpacing: "-0.03em",
      },
      h3: {
        fontFamily: "var(--font-sora)",
        fontWeight: 700,
        letterSpacing: "-0.02em",
      },
      h4: {
        fontFamily: "var(--font-sora)",
        fontWeight: 700,
        letterSpacing: "-0.01em",
      },
      h5: { fontFamily: "var(--font-sora)", fontWeight: 600 },
      h6: { fontFamily: "var(--font-sora)", fontWeight: 600 },
      body1: { lineHeight: 1.7 },
      body2: { lineHeight: 1.6 },
      button: {
        fontWeight: 700,
        letterSpacing: "0.01em",
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            border: `1px solid ${config.secondaryMain}20`,
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(12px)",
            backgroundColor: config.backgroundPaper,
            transition: "border-color 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              borderColor: `${config.secondaryMain}45`,
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: 700,
            textTransform: "none",
            borderRadius: Math.max(6, (config.borderRadius ?? 14) - 4),
            transition: "all 0.2s ease",
          },
          contained: {
            backgroundImage: "none",
            backgroundColor: config.primaryMain,
            color: config.preset === "purple-cyberpunk" ? "#FFFFFF" : (isLight ? "#FFFFFF" : "#030B14"),
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.25)",
            "&:hover": {
              backgroundColor: config.primaryLight || config.primaryMain,
              boxShadow: "0 3px 8px rgba(0, 0, 0, 0.35)",
              transform: "translateY(-1px)",
            },
            "&.Mui-disabled": {
              backgroundImage: "none !important",
              backgroundColor: isLight ? "rgba(0, 0, 0, 0.08) !important" : "rgba(255, 255, 255, 0.06) !important",
              color: isLight ? "rgba(0, 0, 0, 0.38)" : "rgba(148, 163, 184, 0.7)",
              border: `1px dashed ${isLight ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 0.14)"}`,
              boxShadow: "none !important",
            },
          },
          outlined: {
            borderColor: `${config.secondaryMain}55`,
            "&:hover": {
              borderColor: config.secondaryMain,
              backgroundColor: `${config.secondaryMain}10`,
            },
            "&.Mui-disabled": {
              borderColor: isLight ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)",
              color: isLight ? "rgba(0, 0, 0, 0.38)" : "rgba(148, 163, 184, 0.6)",
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            letterSpacing: "0.02em",
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: `${config.secondaryMain}1A`,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: `${config.secondaryMain}30`,
              },
              "&:hover fieldset": {
                borderColor: `${config.secondaryMain}65`,
              },
              "&.Mui-focused fieldset": {
                borderColor: config.secondaryMain,
              },
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            textTransform: "none",
            letterSpacing: "0.01em",
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: `${config.primaryDark || config.primaryMain} ${config.backgroundDefault}`,
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-track": { background: config.backgroundDefault },
            "&::-webkit-scrollbar-thumb": {
              background: config.primaryDark || config.primaryMain,
              borderRadius: "3px",
              "&:hover": { background: config.primaryMain },
            },
          },
        },
      },
    },
  });
}

export const blueTheme = buildPortfolioTheme(themeConfig);
