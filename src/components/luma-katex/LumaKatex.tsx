"use server";
import { katexLumaRenderToString } from "@luma-dev/katex-luma";
import LumaKatexClient from "./LumaKatexClient";
import { MDXRemote } from "next-mdx-remote/rsc";
import { htmlToMdx } from "@/util/html-to-mdx";
import { Fragment } from "react";
import Debug from "../Debug";
import KatexGeneralHackTag from "./KatexGeneralHackTag";
import {
  makeMathTransform1Column,
  makeMathTransform2Column,
  parseMathTransform,
  type KatexLumaMetaShow,
} from "@luma-dev/my-unified/katex-ex";

export type LumaKatexProps = {
  readonly meta: KatexLumaMetaShow;
  readonly globalContext: string;
  readonly defContext: string;
  readonly content: string;
};

export default async function LumaKatex({
  meta,
  globalContext,
  defContext,
  content: contentOriginal,
}: LumaKatexProps) {
  const content = (() => {
    switch (meta.subCategory) {
      case "normal":
        return contentOriginal;
      case "transform1":
        return makeMathTransform1Column(parseMathTransform(contentOriginal));
      case "transform2":
        return makeMathTransform2Column(parseMathTransform(contentOriginal));
      default:
        throw new Error(
          `Unknown subCategory: ${meta.subCategory satisfies never as 0}`
        );
    }
  })();

  const fullContent = globalContext + defContext + content;
  const html = katexLumaRenderToString(fullContent, {
    throwOnError: false,
    strict: false,
    trust: true,
  });
  const mdx = await htmlToMdx({ html });
  return (
    <LumaKatexClient displayMode={meta.mode}>
      <MDXRemote
        source={mdx}
        components={{
          Wrapper: Fragment,
          HackTag: KatexGeneralHackTag,
          Load: Debug,
          NewLine: () => <br />,
        }}
      />
    </LumaKatexClient>
  );
}
