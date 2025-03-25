import React from "react";
"use server";
import Code from "@/components/code/Code.tsx";
import ArticleLayout from "@/components/layouts/ArticleLayout.tsx";
import SharedApp from "@/components/SharedApp.tsx";
import { SrcMeta } from "@/types/article.ts";
import { MDXRemote } from "next-mdx-remote/rsc";
import fs from "node:fs/promises";
import { Fragment } from "react";
import remarkMath from "remark-math";
import Debug from "@/components/Debug.tsx";
import H1 from "@/components/heading/H1.tsx";
import H2 from "@/components/heading/H2.tsx";
import H3 from "@/components/heading/H3.tsx";
import LumaKatex from "@/components/luma-katex/LumaKatex.tsx";
import Counter from "@/components/counter/Counter.tsx";
import Prove from "@/components/Prove.tsx";
import { mdxIndex, tsExports } from "@/contents-index.gen.ts";
import { TermDict, TermMapPredefinedPresets } from "@/types/term.ts";
import { getPageInfo, preparse } from "@/util/preparse.ts";
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
import { makeGeneralAnchor } from "@/components/anchor/makeGeneralAnchor.tsx";
import Series, { makeSeries } from "@/components/series/Series.tsx";
import Term from "@/components/term/Term.ts";
import TermServer from "@/components/term/TermServer.tsx";

export type ArticlePageProps = {
  readonly params: Promise<{
    readonly slug?: readonly string[];
  }>;
};
export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const linkPath = slug?.join("/") ?? "";
  const { index, srcMeta, info } = await getPageInfo(linkPath);
  return (
    <SharedApp>
      <ArticleLayout meta={srcMeta}>
        {0
          ? (
            <pre>
            <code>{info.contents}</code>
            </pre>
          )
          : (
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
                Term: TermServer,
                Series: makeSeries(linkPath),
                LumaCounter: Counter,
                Prove,
                h1: H1,
                h2: H2,
                h3: H3,
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
