"use server";
import { createPassThrough } from "../html-hack/pass-through";
import TermServer from "../term/TermServer";

const SpanPassThrough = createPassThrough("span");

export type KatexGeneralSpanProps = {
  readonly "data-term"?: string;
  readonly "data-reference"?: string;
};
export default async function KatexGeneralSpan({
  "data-term": term,
  "data-reference": reference,
  ...props
}: KatexGeneralSpanProps) {
  if (typeof term === "string" && typeof reference === "string") {
    return <TermServer text={term} reference={reference} />;
  }
  return <SpanPassThrough {...props} />;
}
