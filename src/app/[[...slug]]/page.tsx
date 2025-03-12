/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import Code from "@/components/code/Code";
import ArticleLayout from "@/components/layouts/ArticleLayout";
import SharedApp from "@/components/SharedApp";
import { SrcMeta } from "@/types/article";
import { MDXRemote } from "next-mdx-remote/rsc";
import fs from "node:fs/promises";
import { Fragment } from "react";
import remarkMath from "remark-math";
import Debug from "@/components/Debug";
import H1 from "@/components/heading/H1";
import H2 from "@/components/heading/H2";
import H3 from "@/components/heading/H3";
import LumaKatex from "@/components/luma-katex/LumaKatex";
import Counter from "@/components/counter/Counter";
import Prove from "@/components/Prove";
import { mdxIndex, tsExports } from "@/contents-index.gen";
import { TermDict, TermMapPredefinedPresets } from "@/types/term";
import { getPageInfo, preparse } from "@/util/preparse";
import rehypeAddSlug from "@luma-dev/my-unified/rehype-add-slug";
import rehypeCleanInternal from "@luma-dev/my-unified/rehype-clean-internal";
import rehypeCodeMeta from "@luma-dev/my-unified/rehype-code-meta";
import rehypeCounter from "@luma-dev/my-unified/rehype-counter";
import rehypeKatex, {
  RehypeKatexPluginParameters,
} from "@luma-dev/my-unified/rehype-katex";
import rehypeReplaceText from "@luma-dev/my-unified/rehype-replace-text";
import rehypeSave from "@luma-dev/my-unified/rehype-save";
import rehypeWrap from "@luma-dev/my-unified/rehype-wrap";
import { fromAsyncThrowable } from "neverthrow";
import path from "node:path";
import { makeGeneralAnchor } from "@/components/anchor/makeGeneralAnchor";
import Series, { makeSeries } from "@/components/series/Series";

export type ArticlePageProps = {
  readonly params: {
    readonly slug?: readonly string[];
  };
};
export default async function ArticlePage({
  params: { slug },
}: ArticlePageProps) {
  const linkPath = slug?.join("/") ?? "";
  const { index, srcMeta, info } = await getPageInfo(linkPath);
  return (
    <SharedApp>
      <ArticleLayout meta={srcMeta}>
        {0 ? (
          <pre>
            <code>{info.contents}</code>
          </pre>
        ) : (
          <MDXRemote
            source={info.contents}
            components={{
              ...tsExports,
              a: makeGeneralAnchor(linkPath),
              p: Fragment,
              pre: Fragment,
              code: Code,
              LumaToc: Fragment,
              LumaMdxLayout: Fragment,
              LumaKatex,
              Series: makeSeries(linkPath),
              // C: Counter,
              C: Debug,
              Prove,
              h1: H1,
              h2: H2 as any,
              h3: H3 as any,
              Debug,
            }}
            options={{
              mdxOptions: {
                remarkRehypeOptions: {
                  allowDangerousHtml: true,
                },
                rehypePlugins: [
                  rehypeReplaceText,
                  // rehypeKatex,
                  [
                    rehypeKatex,
                    {
                      context: index.texContext,
                    } satisfies RehypeKatexPluginParameters,
                  ],
                  rehypeSave,
                  rehypeCounter,
                  rehypeCodeMeta,

                  rehypeAddSlug,
                  rehypeWrap,

                  rehypeCleanInternal,
                ],
                remarkPlugins: [
                  // remarkFrontmatter,
                  remarkMath,
                  // remarkTerm,
                  // remarkMeta,
                ],
              },
            }}
          />
        )}
      </ArticleLayout>
    </SharedApp>
  );
}
