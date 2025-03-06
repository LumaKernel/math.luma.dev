"use server";
import { katexLumaRenderToString } from "@luma-dev/katex-luma";
import { DisplayMode } from "./type";
import LumaKatexClient from "./LumaKatexClient";

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
  const html = katexLumaRenderToString(fullContent, { throwOnError: false });
  const displayMode = parseKatexOptions(options);
  return (
    <LumaKatexClient displayMode={displayMode}>
      <span dangerouslySetInnerHTML={{ __html: html }} />
    </LumaKatexClient>
  );
}
