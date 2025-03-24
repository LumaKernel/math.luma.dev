import React from "react";
"use server";
import { mdxIndex } from "@/contents-index.gen.ts";
import { getPageInfo } from "@/util/preparse.ts";
import { stringTrimEnd, stringTrimStart } from "@luma-dev/string-util-ts";
import Link from "next/link";

const parseTo = (to: string) => {
  const url = URL.parse("fake://fake/" + to);
  if (url == null) {
    throw new Error(`Couldn't parse as part of URL: ${to}`);
  }
  const linkPath = stringTrimEnd(stringTrimStart(url.pathname, "/"), "/");
  return {
    linkPath,
    hash: url.hash,
  };
};

export type AnchorInternalProps = {
  readonly to: string;
};
export default async function AnchorInternal({ to }: AnchorInternalProps) {
  const { linkPath } = parseTo(to);
  const { info } = await getPageInfo(linkPath);
  return (
    <Link href={to} title={info.meta.title}>
      {info.meta.title}
    </Link>
  );
}
