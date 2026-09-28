"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { THEME_PRESETS, buildPortfolioTheme } from "@/theme/theme";
import { ThemePreset, themeConfig } from "@/data/portfolioData";

export type PresetOption = {
  id: ThemePreset;
  label: string;
  primaryColor: string;
};

type ThemeContextType = {
  currentPreset: ThemePreset;
  setPreset: (preset: ThemePreset) => void;
  availablePresets: PresetOption[];
};

const PRESET_OPTIONS: PresetOption[] = [
  { id: "blue-terminal", label: "Blue Terminal", primaryColor: "#4F9CF9" },
  { id: "emerald-tech", label: "Emerald Tech", primaryColor: "#10B981" },
  { id: "purple-cyberpunk", label: "Cyberpunk", primaryColor: "#A855F7" },
  { id: "amber-glow", label: "Amber Glow", primaryColor: "#F59E0B" },
];

const ThemeContext = createContext<ThemeContextType>({
  currentPreset: themeConfig.preset,
  setPreset: () => {},
  availablePresets: PRESET_OPTIONS,
});

export const usePortfolioTheme = () => useContext(ThemeContext);

let listeners: Array<() => void> = [];

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  listeners.push(listener);
  const handleStorage = () => listener();
  window.addEventListener("storage", handleStorage);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function getSnapshot(): ThemePreset {
  if (typeof window === "undefined") return themeConfig.preset;
  try {
    const saved = localStorage.getItem(
      "devfolio_theme_preset",
    ) as ThemePreset | null;
    if (saved && THEME_PRESETS[saved]) {
      return saved;
    }
  } catch {
    // ignore
  }
  return themeConfig.preset;
}

function getServerSnapshot(): ThemePreset {
  return themeConfig.preset;
}

type AppThemeProviderProps = {
  children: React.ReactNode;
};

export default function AppThemeProvider({ children }: AppThemeProviderProps) {
  const preset = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", preset);
  }, [preset]);

  const setPreset = (newPreset: ThemePreset) => {
    try {
      localStorage.setItem("devfolio_theme_preset", newPreset);
      emitChange();
    } catch {
      // ignore
    }
  };

  const theme = useMemo(() => {
    const base = THEME_PRESETS[preset] || THEME_PRESETS["blue-terminal"];
    return buildPortfolioTheme({
      ...base,
      preset,
    });
  }, [preset]);

  const contextValue = useMemo(
    () => ({
      currentPreset: preset,
      setPreset,
      availablePresets: PRESET_OPTIONS,
    }),
    [preset],
  );

  return (
    <AppRouterCacheProvider options={{ key: "mui" }}>
      <ThemeContext.Provider value={contextValue}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeContext.Provider>
    </AppRouterCacheProvider>
  );
}
