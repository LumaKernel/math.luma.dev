import React from "react";
import { isTheme, useThemeContext } from "./contexts/theme.ts";
import type { ChangeEventHandler } from "react";
import { useCallback } from "react";

const Wrapper = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        background-color: #789d98;
      }
    `}</style>
  </>
);

const Spacer = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        flex: 1 0 0;
      }
    `}</style>
  </>
);

export default function Header() {
  const { theme, setTheme } = useThemeContext()!;

  const themeChangeHandler: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (ev) => {
      const value = ev.target.value;
      if (!isTheme(value)) throw new Error(`Invalid theme: ${value}`);
      setTheme(value);
    },
    [setTheme]
  );

  return (
    <Wrapper>
      <span>math.luma.dev</span>
      <Spacer />
      <select value={theme} onChange={themeChangeHandler}>
        <option value="system">system</option>
        <option value="light">light</option>
        <option value="dark">dark</option>
      </select>
    </Wrapper>
  );
}
