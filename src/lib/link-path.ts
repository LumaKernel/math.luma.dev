import * as path from "node:path";

export const resolveLinkPath = (...args: string[]) => {
  return path.normalize(path.join(...args));
};
