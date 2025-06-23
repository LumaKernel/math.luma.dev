"use client";

import { ThemeContext, useTheme } from "@/contexts/theme";
import GlobalStyle from "@/components/global-style";
import Header from "@/components/header";
import "katex/dist/katex.css";

type TermLayoutProps = Readonly<React.PropsWithChildren>;
export default function TermLayout({ children }: TermLayoutProps) {
  const theme = useTheme();
  return (
    <ThemeContext.Provider value={theme}>
      <div className={`root ${theme.theme}`}>
        <Header />
        <main className="content">
          <div className="inner">{children}</div>
        </main>
      </div>
      <GlobalStyle />
      <style jsx>{`
        .root {
          min-height: 100vh;
          max-height: 100vh;
          height: 100vh;
          overflow-x: unset;
          overflow-y: hidden;
          display: flex;
          flex-direction: column;
        }
        .content {
          flex: 1;
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
        }
        .inner {
          height: 100%;
          padding: 0 1.2rem 0 1.8rem;
        }
      `}</style>
    </ThemeContext.Provider>
  );
}
