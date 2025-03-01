/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import Code from "@/components/code/Code";
import ArticleLayout from "@/components/layouts/ArticleLayout";
import SharedApp from "@/components/SharedApp";
import { SrcMeta } from "@/types/article";
import { MDXRemote } from "next-mdx-remote/rsc";
import fs from "node:fs/promises";
import { Fragment } from "react";

import remarkFrontmatter from "remark-frontmatter";
import remarkMath from "remark-math";

import rehypeKatex from "@luma-dev/my-unified/rehype-katex";
import remarkTerm from "@luma-dev/my-unified/remark-term";
import remarkMeta from "@luma-dev/my-unified/remark-meta";
import rehypeReplaceText from "@luma-dev/my-unified/rehype-replace-text";
import rehypeSave from "@luma-dev/my-unified/rehype-save";
import rehypeCounter from "@luma-dev/my-unified/rehype-counter";
import rehypeCodeMeta from "@luma-dev/my-unified/rehype-code-meta";
import rehypeAddSlug from "@luma-dev/my-unified/rehype-add-slug";
import rehypeWrap from "@luma-dev/my-unified/rehype-wrap";
import rehypeCleanInternal from "@luma-dev/my-unified/rehype-clean-internal";
import Debug from "@/components/Debug";
import Prove from "@/components/Prove";
import H1 from "@/components/heading/H1";
import H2 from "@/components/heading/H2";
import H3 from "@/components/heading/H3";
import path from "node:path";
import _foo_bar from "@/contents/introduction-to-knapsack/Prob1Stmt";
import LumaKatex from "@/components/luma-katex/LumaKatex";
import { preparse } from "@/util/preparse";
import { TermDict, TermMapPredefinedPresets } from "@/types/term";
import * as contentsComponents from "@/contents-components.gen";

const presets: TermMapPredefinedPresets = {};
const termDict: TermDict = [];

export default async function Home() {
  const contentsDir = path.resolve(process.cwd(), "src/contents");
  const p = "introduction-to-knapsack/_.mdx";
  const mdx = await fs.readFile(path.join(contentsDir, p), "utf-8");
  const srcMeta: SrcMeta = {
    originalPath: p,
    linkPath: p.slice(0, -"/_.mdx".length),
  };
  const info = await preparse({
    mdx,
    termDict,
    presets,
    srcMeta,
  });
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
              ...contentsComponents,
              p: Fragment,
              pre: Fragment,
              //code: Code,
              code: Debug,
              LumaToc: Fragment,
              LumaMdxLayout: Fragment,
              LumaKatex,
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
                  rehypeKatex,
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
