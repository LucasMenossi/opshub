export type Theme = "light" | "dark" | "system";

export function setTheme(theme: Theme) {
  const root = document.documentElement;

  root.classList.remove("light", "dark");

  if (theme === "system") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    root.classList.add(prefersDark ? "dark" : "light");

    return;
  }

  root.classList.add(theme);
}
