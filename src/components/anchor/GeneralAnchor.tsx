import Debug from "../Debug";
import path from "node:path";
import AnchorInternal from "./internal/AnchorInternal";

export type GeneralAnchorProps = {
  readonly linkPath: string;
  readonly href: string;
};
const AnchorExternal = Debug;
export default function GeneralAnchor({ linkPath, href }: GeneralAnchorProps) {
  if (href.startsWith("https://")) {
    return <AnchorExternal href={href} />;
  }
  const to = path.normalize(path.join(linkPath, href));
  return <AnchorInternal to={to} />;
}
