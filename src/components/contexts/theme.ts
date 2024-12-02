import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

export const themes = ["system", "light", "dark"] as const;
export type Theme = (typeof themes)[number];

export const isTheme: (x: string) => x is Theme = (x) =>
  x === "system" || x === "light" || x === "dark";

export interface ThemeContextType {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}
export const ThemeContext = createContext<null | ThemeContextType>(null);

export const useTheme = (): ThemeContextType => {
  const [theme, setTheme] = useState<Theme>("system");
  return {
    theme,
    setTheme,
  };
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
