"use client";

import { ThemeContext, useTheme } from "./contexts/theme";
import GlobalStyle from "./global-style";
import Header from "./header";
import "katex/dist/katex.css";

type Props = Readonly<React.PropsWithChildren>;

const SharedApp = ({ children }: Props) => {
  const theme = useTheme();
  return (
    <ThemeContext.Provider value={theme}>
      <div className={`root ${theme.theme}`}>
        <Header />
        {children}
      </div>
      <GlobalStyle />
      <style jsx>{`
        .root {
          padding-bottom: 4rem;
          min-height: 100vh;
          overflow-x: auto;
        }
      `}</style>
    </ThemeContext.Provider>
  );
};

export default SharedApp;
