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
import rehypeAddSlug from "@luma-dev/my-unified/rehype-add-slug";
import rehypeWrap from "@luma-dev/my-unified/rehype-wrap";
import rehypeCleanInternal from "@luma-dev/my-unified/rehype-clean-internal";
import Debug from "@/components/Debug";
import Prove from "@/components/Prove";
import H1 from "@/components/heading/H1";
import H2 from "@/components/heading/H2";
import H3 from "@/components/heading/H3";
import * as cp from "node:child_process";
import path from "node:path";
import _foo_bar from "@/contents/introduction-to-knapsack/Prob1Stmt";

const srcDir = path.resolve(__dirname, "..");
const contentsDir = path.resolve(srcDir, "contents");

type TermReading = Readonly<{
  text: string;
  ruby?: string;
  ja_ruby?: string;
  slug: string;
}>;
type TermDef = Readonly<{
  main: TermReading;
  alt: ReadonlyArray<TermReading>;
}>;
type TermDict = ReadonlyArray<TermDef>;
type TermMapPreset = Readonly<Record<string, string>>;
type TermMapPredefinedPresets = Readonly<Record<string, TermMapPreset>>;
export type PreparseInput = Readonly<{
  mdx: string;
  termDict: TermDict;
  presets: TermMapPredefinedPresets;
  srcMeta: SrcMeta;
}>;

// MDXの先頭にあるtomlのメタ
type ArticleMeta = Readonly<{
  published: boolean;
  title: string;
  // 使わないものは省略
}>;

type ArticleInfo = Readonly<{
  meta: ArticleMeta;
  contents: string;
}>;

const f = (input: PreparseInput) => {
  const output = cp.execFileSync(
    "preparse",
    ["--input-json", JSON.stringify(input)],
    { encoding: "utf8" }
  );
  const info: ArticleInfo = JSON.parse(output);
  return info;
};

const presets: TermMapPredefinedPresets = {};

const termDict: TermDict = [];

export default async function Home() {
  //const c = await fs.readFile(
  //  "./src/contents/linear-algebra/basics/cramers-rule.mdx",
  //  "utf-8"
  //);
  const mdx = await fs.readFile(
    "./src/contents/introduction-to-knapsack.mdx",
    "utf-8"
  );
  //const mdx = [
  //  '```',
  //  '',
  //  '```',
  //  '<div classname="foo"></div>'
  //].join('\n');
  const srcMeta: SrcMeta = {
    originalPath: "foo.mdx",
    linkPath: "foo",
  };
  const info = f({
    mdx,
    termDict,
    presets,
    srcMeta: srcMeta,
  });
  return (
    <SharedApp>
      <ArticleLayout meta={srcMeta}>
        <MDXRemote
          source={info.contents}
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
              baseUrl: srcDir,
            },
          }}
        />
      </ArticleLayout>
    </SharedApp>
  );
}
