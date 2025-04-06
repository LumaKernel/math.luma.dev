import type { TermDict } from "@/terms-index.gen";
import type { ArticleMeta } from "@/types/article";
import type { TermMapPredefinedPresets } from "@/types/term";
import type {
  TermProcessorProtocol,
  TextProcessed,
} from "@luma-dev/my-unified/rehype-proc-term";
import { spawn } from "node:child_process";
import { ProcessInteractor } from "./process-interactor";

class TermServer implements TermProcessorProtocol {
  #pi: ProcessInteractor;
  constructor(pi: ProcessInteractor) {
    this.#pi = pi;
  }
  async processText(text: string): Promise<TextProcessed> {
    const data = JSON.stringify(text) + "\n";
    const response = await this.#pi.sendAndWaitLine(data);
    return JSON.parse(response) as TextProcessed;
  }
  [Symbol.dispose]() {
    this.#pi[Symbol.dispose]();
  }
}

export type TermServerInput = {
  readonly mdx: string;
  readonly meta: ArticleMeta;
  readonly termDict: TermDict;
  readonly presets: TermMapPredefinedPresets;
};
export const createTermServer = async (input: TermServerInput) => {
  const p = spawn("blogkit-internal-tool", ["term-server"], { stdio: "pipe" });
  const pi = new ProcessInteractor(p);
  await pi.send(JSON.stringify(input) + "\n");
  const termServer = new TermServer(pi);
  return termServer;
};
