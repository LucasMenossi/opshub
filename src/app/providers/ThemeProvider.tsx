import { useEffect, type PropsWithChildren } from "react";

import { useThemeStore } from "@/stores/theme.store";

export function ThemeProvider({ children }: PropsWithChildren) {
  const initializeTheme = useThemeStore((state) => state.initializeTheme);

  useEffect(() => {
    initializeTheme();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = () => {
      const currentTheme = useThemeStore.getState().theme;

      if (currentTheme === "system") {
        initializeTheme();
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [initializeTheme]);

  return children;
}
