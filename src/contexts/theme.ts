import { useLsWith } from "@/hooks/localstorage";
import { createContext, useContext } from "react";

export const themes = ["system", "light", "dark"] as const;
export type Theme = (typeof themes)[number];

export const isTheme = ((x: string) =>
  x === "system" || x === "light" || x === "dark") satisfies (
  x: string,
) => x is Theme;

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
export const ThemeContext = createContext<null | ThemeContextType>(null);

export const useTheme = (): ThemeContextType => {
  const [theme, setTheme] = useLsWith("theme", "system", isTheme);
  return {
    theme,
    setTheme,
  };
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
