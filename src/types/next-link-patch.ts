import React from "react";
import OriginalLink from "next/link";

// Define the LinkPatched type that's compatible with the Link component
export interface LinkProps {
  href: string;
  as?: string;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  prefetch?: boolean;
  locale?: string | false;
  legacyBehavior?: boolean;
  title?: string;
  children: React.ReactNode;
}

// Re-export with patched typed version
export const Link = OriginalLink as any as React.FC<LinkProps>;

export default Link;
