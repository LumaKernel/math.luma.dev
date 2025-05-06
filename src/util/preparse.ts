import { mdxIndex } from "@/contents-index.gen";
import type { ArticleInfo, SrcMeta } from "@/types/article";
import { fromAsyncThrowable } from "neverthrow";
import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { ProcessInteractor } from "./process-interactor";

export type PreparseParams = {
  readonly mdx: string;
  readonly srcMeta: SrcMeta;
};

export const preparse = async (input: PreparseParams) => {
  const p = spawn("blogkit-internal-tool", ["preparse"], { stdio: "pipe" });
  const pi = new ProcessInteractor(p);
  const response = await pi.sendAndWaitLine(JSON.stringify(input) + "\n");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const info: ArticleInfo = JSON.parse(response);
  pi[Symbol.dispose]();
  return info;
};

export const getPageInfo = async (linkPath: string) => {
  const index = Object.hasOwn(mdxIndex, linkPath) ? mdxIndex[linkPath] : null;
  if (index == null) {
    throw new Error(`No index found for ${JSON.stringify(linkPath)}`);
  }

  const filePathCands =
    linkPath === "" ? ["_.mdx"] : [`${linkPath}.mdx`, `${linkPath}/_.mdx`];
  const fileContents = (
    await Promise.all(
      filePathCands.map(async (p) => {
        return fromAsyncThrowable(() =>
          fs.readFile(path.resolve(process.cwd(), "src/contents", p), "utf-8"),
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
    srcMeta,
  });

  return { mdx, index, srcMeta, info };
};
