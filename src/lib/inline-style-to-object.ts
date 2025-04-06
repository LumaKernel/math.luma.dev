import parse from "inline-style-parser";
import type { CSSProperties } from "react";

export const inlineStyleToObject = (style: string): Record<string, string> => {
  const entries = [];
  for (const dec of parse(style)) {
    switch (dec.type) {
      case "declaration":
        entries.push([snakeToCamel(dec.property), dec.value]);
        break;
      case "comment":
        break;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Object.fromEntries(entries);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hackStyle = (style: any): CSSProperties | undefined => {
  if (typeof style === "string") {
    return inlineStyleToObject(style);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return style;
};

const snakeToCamel = (str: string) => {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};
