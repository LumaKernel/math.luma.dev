import React from "react";
import Debug from "../Debug.tsx";
import AnchorInternal from "./internal/AnchorInternal.tsx";
import { resolveLinkPath } from "@/lib/link-path.ts";

export type GeneralAnchorProps = {
  readonly currentLinkPath: string;
  readonly href: string;
};
const AnchorExternal = Debug;
export default function GeneralAnchor({
  currentLinkPath,
  href,
}: GeneralAnchorProps) {
  if (href.startsWith("https://")) {
    return <AnchorExternal href={href} />;
  }
  const to = resolveLinkPath(currentLinkPath, href);
  return <AnchorInternal to={to} />;
}
