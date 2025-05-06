"use server";
import HackTag from "@/components/html-hack/HackTag";
import TermServer from "@/components/term/TermServer";

export type KatexGeneralTagProps = {
  readonly "data-term"?: string;
  readonly "data-reference"?: string;
};
export default async function KatexGeneralTag({
  "data-term": term,
  "data-reference": reference,
  ...props
}: KatexGeneralTagProps) {
  if (typeof term === "string" && typeof reference === "string") {
    return <TermServer text={term} reference={reference} />;
  }
  return <HackTag {...props} />;
}
