import type { ChildProcessWithoutNullStreams } from "child_process";
import util from "node:util";

export class ProcessInteractor {
  #p: ChildProcessWithoutNullStreams;
  constructor(p: ChildProcessWithoutNullStreams) {
    this.#p = p;
    p.stdout.setEncoding("utf-8");
    p.stderr.setEncoding("utf-8");

    const stderrDataHandler = (data: string) => {
      process.stderr.write(data);
    };
    this.#p.stderr.on("data", stderrDataHandler);
  }

  async send(message: string): Promise<void> {
    await util.promisify((cb: () => void) =>
      this.#p.stdin.write(message, cb)
    )();
  }

  async sendAndWaitLine(message: string): Promise<string> {
    // TODO: lock is necessary

    let stdout = "";

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
    const closeHandler = () => {
      this.#p.stdout.off("data", stdoutDataHandler);
      this.#p.off("close", closeHandler);
    };
    this.#p.on("close", closeHandler);

    await this.send(message);
    while (stdout.at(-1) !== "\n") {
      await prom;
    }
    closeHandler();
    return stdout;
  }
  [Symbol.dispose]() {
    this.#p.kill();
  }
}
