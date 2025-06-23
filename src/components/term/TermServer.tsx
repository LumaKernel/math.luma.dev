"use server";
import { termDictMap } from "@/terms-index.gen";
import type { TermContainer } from "@luma-dev/my-unified/rehype-proc-term";
import type { TermRefCategory } from "./TermClient";
import TermClient from "./TermClient";

type TermProps = {
  readonly text: string;
  readonly reference: string;
  readonly refIndex: number;
  readonly termContainer?: TermContainer | null;
  readonly refCategory: TermRefCategory;
  readonly overrideRuby?: boolean | null;
};
export default async function TermServer({
  text,
  reference,
  refIndex,
  refCategory,
  overrideRuby = null,
  termContainer = null,
}: TermProps): Promise<React.ReactElement> {
  const term = termDictMap[reference];
  if (term == null) {
    throw new Error(`No term found for ${JSON.stringify(reference)}`);
  }
  const showRubyFallback = refIndex === 0;
  return (
    <TermClient
      text={text}
      reference={reference}
      term={term}
      showRuby={overrideRuby ?? showRubyFallback}
      refIndex={refIndex}
      refCategory={refCategory}
      termContainer={termContainer}
    />
  );
}
