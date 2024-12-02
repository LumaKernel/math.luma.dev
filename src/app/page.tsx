/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import Code from "@/components/code/Code";
import ArticleLayout from "@/components/layouts/ArticleLayout";
import SharedApp from "@/components/SharedApp";
import { ArticleMetadata } from "@/types/article";
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
import rehypeAddSlug from "@luma-dev/my-unified/rehype-add-slug";
import rehypeWrap from "@luma-dev/my-unified/rehype-wrap";
import rehypeCleanInternal from "@luma-dev/my-unified/rehype-clean-internal";
import Debug from "@/components/Debug";
import Prove from "@/components/Prove";
import H1 from "@/components/heading/H1";
import H2 from "@/components/heading/H2";
import H3 from "@/components/heading/H3";

const f = (c: string) => {
  const lines = c.split("\n");
  const head = [];
  for (const line of lines) {
    if (line === "---") {
    } else {
      head.push(line);
    }
  }
};

export default async function Home() {
  const c = await fs.readFile(
    "./src/contents/linear-algebra/basics/cramers-rule.mdx",
    "utf-8"
  );
  const am: ArticleMetadata = {
    originalPath: "foo.mdx",
    originalPathAbs: "/.../foo.mdx",
    linkPath: "foo",
  };
  return (
    <SharedApp>
      <ArticleLayout meta={am}>
        <MDXRemote
          source={c}
          components={{
            p: Fragment,
            pre: Fragment,
            //code: Code,
            LumaToc: Fragment,
            LumaMdxLayout: Fragment,
            LumaKatex: Debug,
            Prove,
            h1: H1,
            h2: H2 as any,
            h3: H3 as any,
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

                rehypeAddSlug,
                rehypeWrap,

                rehypeCleanInternal,
              ],
              remarkPlugins: [
                remarkFrontmatter,
                remarkMath,
                remarkTerm,
                remarkMeta,
              ],
            },
          }}
        />
      </ArticleLayout>
    </SharedApp>
  );
}
