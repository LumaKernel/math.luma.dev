import type { SeriesConfig } from "@/contents-index.gen";
import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import util from "node:util";
const execFileAsync = util.promisify(execFile);

export const parseSeriesConfig = async (inputToml: string) => {
  const { stdout, stderr } = await execFileAsync(
    "blogkit-internal-tool",
    ["parse-series-config", "--input-toml", inputToml],
    { encoding: "utf8" }
  );
  if (stderr.length > 0) {
    console.error(stderr);
  }
  const seriesConfig: SeriesConfig = JSON.parse(stdout);
  return seriesConfig;
};

export const getSeriesConfig = async (linkPath: string) => {
  const inputToml = await fs.readFile(
    path.resolve(process.cwd(), "src/contents", linkPath, "_series.toml"),
    "utf-8"
  );
  const seriesConfig = parseSeriesConfig(inputToml);
  return seriesConfig;
};
