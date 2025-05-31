"use server";
import Debug from "../Debug";
import AnchorInternal from "./internal/AnchorInternal";
import { resolveLinkPath } from "@/lib/link-path";

export type GeneralAnchorProps = {
  readonly currentLinkPath: string;
  readonly href: string;
};
const AnchorExternal = Debug;
export default async function GeneralAnchorNeedingMeta({
  currentLinkPath,
  href,
}: GeneralAnchorProps) {
  if (href.startsWith("https://")) {
    return <AnchorExternal href={href} />;
  }
  const to = resolveLinkPath(currentLinkPath, href);
  return <AnchorInternal to={to} />;
}
