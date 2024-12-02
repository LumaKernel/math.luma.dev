//import { spawn } from "node:child_process";

type RenderCodeResult = Readonly<{
  langCode: string;
  html: string;
}>;
export const renderCode = async (
  langCode: string,
  code: string
): Promise<RenderCodeResult> => {
  const { spawn } = await import("node:child_process");
  return new Promise((resolve, reject) => {
    const p = spawn("luma-hl-render", ["--code", code, "--lang", langCode], {
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdoutString = "";
    let stderrString = "";
    p.stdout.on("data", (data) => {
      stdoutString += data.toString();
    });
    p.stderr.on("data", (data) => {
      stderrString += data.toString();
    });

    p.once("exit", (exitCode) => {
      if (exitCode === 0) {
        const sepIdx = stdoutString.search(":");
        const langCode = stdoutString.slice(0, sepIdx);
        const html = stdoutString.slice(sepIdx + 1);
        resolve({
          langCode,
          html,
        });
      } else {
        reject(new Error(`Failed to render code: ${stderrString}`));
      }
    });
  });
};
