import { mdxIndex } from "@/contents-index.gen";
import type { TermDict } from "@/terms-index.gen";
import { termDict } from "@/terms-index.gen";
import type { ArticleInfo, SrcMeta } from "@/types/article";
import type { TermMapPredefinedPresets } from "@/types/term";
import { fromAsyncThrowable } from "neverthrow";
import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import type { TextProcessed } from "@luma-dev/my-unified/rehype-proc-term";
import type { TermProcessorProtocol } from "@luma-dev/my-unified/rehype-proc-term";
import { ProcessInteractor } from "./process-interactor";

export type PreparseParams = {
  readonly mdx: string;
  readonly termDict: TermDict;
  readonly presets: TermMapPredefinedPresets;
  readonly srcMeta: SrcMeta;
};

class TermProcessor implements TermProcessorProtocol {
  #pi: ProcessInteractor;
  readonly info: ArticleInfo;
  constructor(pi: ProcessInteractor, info: ArticleInfo) {
    this.#pi = pi;
    this.info = info;
  }
  async processText(text: string): Promise<TextProcessed> {
    const data = JSON.stringify(text) + "\n";
    const { stdout, stderr } = await this.#pi.sendAndWaitLine(data);
    if (stderr.length > 0) {
      console.error(stderr);
    }
    return JSON.parse(stdout) as TextProcessed;
  }
  [Symbol.dispose]() {
    this.#pi[Symbol.dispose]();
  }
}

export const preparse = async (input: PreparseParams) => {
  const termProcessor = await preparseThenUsingTermProcessor(input);
  termProcessor[Symbol.dispose]();
  return termProcessor.info;
};

export const preparseThenUsingTermProcessor = async (input: PreparseParams) => {
  const p = spawn("blogkit-internal-tool", ["preparse"], { stdio: "pipe" });
  const pi = new ProcessInteractor(p);
  const { stdout, stderr } = await pi.sendAndWaitLine(
    JSON.stringify(input) + "\n"
  );
  if (stderr.length > 0) {
    console.error(stderr);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const info: ArticleInfo = JSON.parse(stdout);
  const termProcessor = new TermProcessor(pi, info);
  return termProcessor;
};

// TODO
const presets: TermMapPredefinedPresets = {};

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
          fs.readFile(path.resolve(process.cwd(), "src/contents", p), "utf-8")
        )()
          .map((e) => [p, e] as const)
          .unwrapOr(null);
      })
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

  return { mdx, index, srcMeta, info };
};
