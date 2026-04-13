"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { blueTheme } from "@/theme/theme";

type AppThemeProviderProps = {
  children: React.ReactNode;
};

export default function AppThemeProvider({ children }: AppThemeProviderProps) {
  return (
    <AppRouterCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={blueTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
