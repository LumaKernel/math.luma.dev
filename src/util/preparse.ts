import {ArticleInfo, SrcMeta} from "@/types/article";
import {TermDict, TermMapPredefinedPresets} from "@/types/term";
import { execFile } from "node:child_process";
import util from "node:util";
const execFileAsync = util.promisify(execFile);

export type PreparseParams = {
  readonly mdx: string;
  readonly termDict: TermDict;
  readonly presets: TermMapPredefinedPresets;
  readonly srcMeta: SrcMeta;
}

export const preparse = async (input: PreparseParams) => {
  const {stdout} = await execFileAsync(
    "blogkit-internal-tool",
    ["preparse", "--input-json", JSON.stringify(input)],
    { encoding: "utf8" }
  );
  const info: ArticleInfo = JSON.parse(stdout);
  return info;
};
