import { mdxIndex } from "@/contents-index.gen.ts";
import { TermDict, termDict } from "@/terms-index.gen.ts";
import { ArticleInfo, SrcMeta } from "@/types/article.ts";
import { TermMapPredefinedPresets } from "@/types/term.ts";
import { fromAsyncThrowable } from "neverthrow";
import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

export type PreparseParams = {
  readonly mdx: string;
  readonly termDict: TermDict;
  readonly presets: TermMapPredefinedPresets;
  readonly srcMeta: SrcMeta;
};

export const preparse = async (input: PreparseParams) => {
  const p = spawn(
    "blogkit-internal-tool",
    ["preparse", "--input-json", JSON.stringify(input)],
    {
      stdio: "pipe",
      timeout: 0.5,
    },
  );
  if (stderr.length > 0) {
    console.error(stderr);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const info: ArticleInfo = JSON.parse(stdout);
  return info;
};

// TODO
const presets: TermMapPredefinedPresets = {};

export const getPageInfo = async (linkPath: string) => {
  const index = Object.hasOwn(mdxIndex, linkPath) ? mdxIndex[linkPath] : null;
  if (index == null) {
    throw new Error(`No index found for ${JSON.stringify(linkPath)}`);
  }

  const filePathCands = linkPath === ""
    ? ["_.mdx"]
    : [`${linkPath}.mdx`, `${linkPath}/_.mdx`];
  const fileContents = (
    await Promise.all(
      filePathCands.map(async (p) => {
        return fromAsyncThrowable(() =>
          fs.readFile(path.resolve(process.cwd(), "src/contents", p), "utf-8")
        )()
          .map((e) => [p, e] as const)
          .unwrapOr(null);
      }),
    )
  ).filter((x) => x != null);
  const [fileContent, fileContent1] = fileContents;
  if (fileContent == null) {
    throw new Error(`No file found for ${JSON.stringify(linkPath)}`);
  }
  if (fileContent1 != null) {
    throw new Error(`Multiple files found for ${JSON.stringify(linkPath)}`);
  }

  const [originalPath, mdx] = fileContent;

  const srcMeta: SrcMeta = {
    originalPath,
    linkPath,
  };
  const info = await preparse({
    mdx,
    termDict,
    presets,
    srcMeta,
  });

  return { index, srcMeta, info };
};
