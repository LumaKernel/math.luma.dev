import { execFile } from "node:child_process";
import { promisify } from "node:util";
const execFileAsync = promisify(execFile);

type RenderCodeResult = Readonly<{
  langCode: string;
  mdx: string;
}>;
export const renderCode = async (
  langCode0: string,
  code: string
): Promise<RenderCodeResult> => {
  const { stdout, stderr } = await execFileAsync("blogkit-internal-tool", [
    "lumahl",
    "--code",
    code,
    "--lang",
    langCode0,
  ]);

  if (stderr.length > 0) {
    console.log(code);
    console.error(stderr);
  }

  const sepIdx = stdout.search(":");
  const langCode = stdout.slice(0, sepIdx);
  const mdx = stdout.slice(sepIdx + 1);

  return {
    langCode,
    mdx,
  };
};
