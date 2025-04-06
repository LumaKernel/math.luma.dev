import type { ChildProcessWithoutNullStreams } from "child_process";
import util from "node:util";

export class ProcessInteractor {
  #p: ChildProcessWithoutNullStreams;
  constructor(p: ChildProcessWithoutNullStreams) {
    this.#p = p;
    p.stdout.setEncoding("utf-8");
    p.stderr.setEncoding("utf-8");
  }

  async sendAndWaitLine(
    message: string,
  ): Promise<{ stdout: string; stderr: string }> {
    // TODO: lock is necessary

    let stdout = "";
    let stderr = "";

    let resolve: () => void;
    let prom = new Promise<void>((r) => {
      resolve = r;
    });
    const stdoutDataHandler = (data: string) => {
      stdout += data;
      resolve();
      prom = new Promise((r) => {
        resolve = r;
      });
    };
    this.#p.stdout.on("data", stdoutDataHandler);
    const stderrDataHandler = (data: string) => {
      stderr += data;
    };
    this.#p.stderr.on("data", stderrDataHandler);
    const closeHandler = () => {
      this.#p.stdout.off("data", stdoutDataHandler);
      this.#p.stderr.off("data", stderrDataHandler);
      this.#p.off("close", closeHandler);
    };
    this.#p.on("close", closeHandler);

    await util.promisify((cb: () => void) =>
      this.#p.stdin.write(message, cb),
    )();
    while (stdout.at(-1) !== "\n") {
      await prom;
    }
    if (stderr.length > 0) {
      console.error(stderr);
    }
    closeHandler();
    return { stdout, stderr };
  }
  [Symbol.dispose]() {
    this.#p.kill();
  }
}
