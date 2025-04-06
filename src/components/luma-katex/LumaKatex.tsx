"use server";
import { katexLumaRenderToString } from "@luma-dev/katex-luma";
import type { DisplayMode } from "./type";
import LumaKatexClient from "./LumaKatexClient";
import { MDXRemote } from "next-mdx-remote/rsc";
import { htmlToMdx } from "@/util/html-to-mdx";
import { Fragment } from "react";
import Debug from "../Debug";
import { createPassThrough } from "../html-hack/pass-through";
import KatexGeneralSpan from "./KatexGeneralSpan";

export type LumaKatexProps = {
  readonly options: unknown;
  readonly globalContext: string;
  readonly defContext: string;
  readonly content: string;
};

const parseKatexOptions = (options: unknown): DisplayMode => {
  if (typeof options !== "string") return "block-display";
  const opts = options.split(/\s+/);
  if (opts.includes("inline")) return "inline";
  return "block-display";
};

export default async function LumaKatex({
  options,
  globalContext,
  defContext,
  content,
}: LumaKatexProps) {
  const fullContent = globalContext + defContext + content;
  const html = katexLumaRenderToString(fullContent, {
    throwOnError: false,
    strict: false,
    trust: true,
  });
  const displayMode = parseKatexOptions(options);
  const mdx = await htmlToMdx({ html });
  return (
    <LumaKatexClient displayMode={displayMode}>
      <MDXRemote
        source={mdx}
        components={{
          Wrapper: Fragment,
          div: createPassThrough("div"),
          Span: KatexGeneralSpan,
          svg: createPassThrough("svg"),
          path: createPassThrough("path"),
          Load: Debug,
        }}
      />
    </LumaKatexClient>
  );
}
