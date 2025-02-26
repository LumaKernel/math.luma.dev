import {execFile} from 'node:child_process';
import util from 'node:util';
const execFileAsync = util.promisify(execFile);

export type HtmlToMdxParams = {
  readonly html: string;
}
export const htmlToMdx = async ({html}: HtmlToMdxParams) => {
  const {stdout} = await execFileAsync('blogkit-internal-tool', ['html-to-mdx', '--html', html]);
  return stdout;
};
