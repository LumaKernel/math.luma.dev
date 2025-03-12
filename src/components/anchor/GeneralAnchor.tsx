import Debug from "../Debug";
import path from "node:path";
import AnchorInternal from "./internal/AnchorInternal";
import { resolveLinkPath } from "@/lib/link-path";

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
