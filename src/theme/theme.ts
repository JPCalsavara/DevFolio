import { createTheme } from "@mui/material/styles";

export const blueTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#5C9CFF",
    },
    secondary: {
      main: "#7DD3FC",
    },
    background: {
      default: "#07111F",
      paper: "#0D1B2D",
    },
    text: {
      primary: "#F3F7FF",
      secondary: "#A8B9D4",
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: "var(--font-inter)",
    h1: {
      fontFamily: "var(--font-sora)",
      fontWeight: 700,
      letterSpacing: "-0.03em",
    },
    h2: {
      fontFamily: "var(--font-sora)",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h3: {
      fontFamily: "var(--font-sora)",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(125, 211, 252, 0.16)",
          boxShadow: "0 18px 50px rgba(3, 13, 29, 0.35)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          textTransform: "none",
        },
      },
    },
  },
});
