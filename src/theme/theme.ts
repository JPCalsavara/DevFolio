import { createTheme } from "@mui/material/styles";

// ============================================================
// Perfil: Backend / Data Dev
// Filosofia: Terminal-chic. Técnico, sofisticado, sem frescura.
// ============================================================

export const blueTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4F9CF9",       // Azul elétrico principal
      light: "#7DB9FF",
      dark: "#1A6FD8",
    },
    secondary: {
      main: "#38BDF8",       // Ciano frio — accent de destaque
      light: "#7DD3FC",
      dark: "#0284C7",
    },
    background: {
      default: "#05101E",    // Quase preto, azul noite profundo
      paper: "#0B1A2E",      // Cards ligeiramente mais claros
    },
    text: {
      primary: "#EDF2FF",
      secondary: "#8BAFC9",
    },
    divider: "rgba(56, 189, 248, 0.1)",
    success: { main: "#22D3EE" },
    error:   { main: "#F87171" },
    warning: { main: "#FBBF24" },
  },
  shape: {
    borderRadius: 14,
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
          border: "1px solid rgba(56, 189, 248, 0.12)",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(56,189,248,0.08) inset",
          backdropFilter: "blur(12px)",
          backgroundImage: "linear-gradient(135deg, rgba(11,26,46,0.95) 0%, rgba(5,16,30,0.98) 100%)",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            borderColor: "rgba(56, 189, 248, 0.28)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(56,189,248,0.12)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          textTransform: "none",
          borderRadius: 10,
          transition: "all 0.2s ease",
        },
        contained: {
          backgroundImage: "linear-gradient(135deg, #4F9CF9 0%, #38BDF8 100%)",
          boxShadow: "0 4px 16px rgba(79, 156, 249, 0.3)",
          "&:hover": {
            boxShadow: "0 6px 20px rgba(79, 156, 249, 0.45)",
            transform: "translateY(-1px)",
          },
        },
        outlined: {
          borderColor: "rgba(56, 189, 248, 0.35)",
          "&:hover": {
            borderColor: "rgba(56, 189, 248, 0.7)",
            backgroundColor: "rgba(56, 189, 248, 0.06)",
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
          borderColor: "rgba(56, 189, 248, 0.1)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(56, 189, 248, 0.2)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(56, 189, 248, 0.45)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#38BDF8",
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
          scrollbarColor: "#1A3A5C #05101E",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-track": { background: "#05101E" },
          "&::-webkit-scrollbar-thumb": {
            background: "#1A3A5C",
            borderRadius: "3px",
            "&:hover": { background: "#2A5A8C" },
          },
        },
      },
    },
  },
});
