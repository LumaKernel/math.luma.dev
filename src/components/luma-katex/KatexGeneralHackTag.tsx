"use server";
import HackTag from "@/components/html-hack/HackTag";
import TermServer from "@/components/term/TermServer";
import { pagefindAttrs } from "@/util/pagefind";

export type KatexGeneralTagProps = {
  readonly "data-term"?: string;
  readonly "data-reference"?: string;
  readonly [key: string]: unknown;
};
export default async function KatexGeneralTag({
  "data-term": term,
  "data-reference": reference,
  ...props
}: KatexGeneralTagProps) {
  if (typeof term === "string" && typeof reference === "string") {
    return <TermServer text={term} reference={reference} />;
  }
  if (props.className === "katex-html") {
    // kathtex-mathml と katex-html で内容が二重になってしまっていそう
    // Pagefind利用のときに二重になる
    return <HackTag {...props} {...pagefindAttrs.ignore} />;
  }
  return <HackTag {...props} />;
}
