"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { blueTheme } from "@/theme/theme";

type AppThemeProviderProps = {
  children: React.ReactNode;
};

export default function AppThemeProvider({ children }: AppThemeProviderProps) {
  return (
    <ThemeProvider theme={blueTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
