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
  "data-index": refIndexString,
  ...props
}: KatexGeneralTagProps) {
  const refIndex = parseAsInt(refIndexString);
  if (
    typeof term === "string" &&
    typeof reference === "string" &&
    typeof refIndex === "number"
  ) {
    return (
      <TermServer
        text={term}
        reference={reference}
        refIndex={refIndex}
        refCategory="in-math"
        overrideRuby={false}
      />
    );
  }
  if (props.className === "katex-html") {
    // kathtex-mathml と katex-html で内容が二重になってしまっていそう
    // Pagefind利用のときに二重になる
    return <HackTag {...props} {...pagefindAttrs.ignoreAll} />;
  }
  return <HackTag {...props} />;
}

const parseAsInt = (value: unknown): number | null => {
  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? null : parsed;
  }
  return null;
};
