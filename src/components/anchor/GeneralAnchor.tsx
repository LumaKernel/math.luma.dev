"use server";
import Debug from "../Debug";
import Wikipedia from "../wikipedia";
import AnchorInternal from "./internal/AnchorInternal";
import { resolveLinkPath } from "@/lib/link-path";

export type GeneralAnchorProps = {
  readonly currentLinkPath: string;
  readonly href: string;
};
const AnchorExternal = Debug;
export default async function GeneralAnchor({
  currentLinkPath,
  href: hrefString,
}: GeneralAnchorProps) {
  const href = parseHref(hrefString);
  switch (href.type) {
    case "wikipedia-en":
      return <Wikipedia en={href.link} />;
    case "wikipedia-ja":
      return <Wikipedia ja={href.link} />;
    case "external":
      return <AnchorExternal href={href.href} />;
    case "internal": {
      const to = resolveLinkPath(currentLinkPath, href.href);
      return <AnchorInternal to={to} />;
    }
    default:
      throw new Error(
        `Unknown href type: ${(href satisfies never as { type: string }).type}`,
      );
  }
}

export type HrefWikipediaEn = {
  readonly type: "wikipedia-en";
  readonly link: string;
};
export type HrefWikipediaJa = {
  readonly type: "wikipedia-ja";
  readonly link: string;
};
export type HrefExternal = {
  readonly type: "external";
  readonly href: string;
};
export type HrefInternal = {
  readonly type: "internal";
  readonly href: string;
};
export type Href =
  | HrefWikipediaEn
  | HrefWikipediaJa
  | HrefExternal
  | HrefInternal;

const parseHref = (href: string): Href => {
  {
    const pat = /^https:\/\/en\.wikipedia\.org\/wiki\/(.+)$/;
    const match = href.match(pat);
    if (match != null) {
      const link = match[1];
      return {
        type: "wikipedia-en",
        link,
      };
    }
  }
  {
    const pat = /^https:\/\/ja\.wikipedia\.org\/wiki\/(.+)$/;
    const match = href.match(pat);
    if (match != null) {
      const link = match[1];
      return {
        type: "wikipedia-ja",
        link,
      };
    }
  }
  if (href.startsWith("https://")) {
    return {
      type: "external",
      href,
    };
  }
  return {
    type: "internal",
    href,
  };
};
