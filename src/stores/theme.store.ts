import { create } from "zustand";

export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "opshub-theme";

function getStoredTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }

  return "system";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  root.classList.toggle("dark", isDark);
}

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  initializeTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: getStoredTheme(),

  setTheme: (theme) => {
    localStorage.setItem(STORAGE_KEY, theme);

    applyTheme(theme);

    set({ theme });
  },

  initializeTheme: () => {
    const theme = getStoredTheme();

    applyTheme(theme);

    set({ theme });
  },
}));
