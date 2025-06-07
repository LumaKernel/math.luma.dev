"use server";
import { katexLumaRenderToString } from "@luma-dev/katex-luma";
import LumaKatexClient from "./LumaKatexClient";
import { MDXRemote } from "next-mdx-remote/rsc";
import { htmlToMdx } from "@/util/html-to-mdx";
import { Fragment } from "react";
import Debug from "../Debug";
import KatexGeneralHackTag from "./KatexGeneralHackTag";
import type { KatexLumaMeta } from "@luma-dev/my-unified/katex-ex";
import {
  makeMathTransform1Column,
  makeMathTransform2Column,
  parseMathTransform,
} from "@luma-dev/my-unified/katex-ex";
import type { WithServerMeta } from "@/util/server-meta";

export type LumaKatexProps = WithServerMeta<{
  readonly meta: KatexLumaMeta;
  readonly globalContext: string;
  readonly defContext: string;
  readonly content: string;
}>;

export default async function LumaKatex({
  serverMeta: {
    articleInfo: {
      meta: { strict },
    },
    isProduction,
  },
  meta: metaOrig,
  globalContext,
  defContext,
  content: contentOriginal,
}: LumaKatexProps) {
  if (metaOrig.category === "def") {
    return null;
  }

  const meta = (() => {
    // saveをloadしたものの場合はsaveのまま来る
    if (metaOrig.category === "save") {
      return metaOrig.saved;
    }
    return metaOrig;
  })();

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
          `Unknown subCategory: ${meta.subCategory satisfies never as 0}`,
        );
    }
  })();
  const styleSpec = (() => {
    if (!meta.block && meta.display) {
      return "\\displaystyle ";
    }
    return "";
  })();

  const fullContent = styleSpec + globalContext + defContext + content;
  const html = katexLumaRenderToString(fullContent, {
    throwOnError: false,
    strict: false,
    trust: true,
    displayMode: meta.display && meta.block,
  });
  const mdx = await htmlToMdx({ html });
  return (
    <LumaKatexClient block={meta.block}>
      {isProduction || strict ? (
        <MDXRemote
          source={mdx}
          components={{
            Wrapper: Fragment,
            HackTag: KatexGeneralHackTag,
            Load: Debug,
            NewLine: () => <br />,
          }}
        />
      ) : (
        <span dangerouslySetInnerHTML={{ __html: html }} />
      )}
    </LumaKatexClient>
  );
}
