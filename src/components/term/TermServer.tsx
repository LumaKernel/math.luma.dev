"use server";
import { termDictMap } from "@/terms-index.gen";
import TermClient from "./TermClient";
import type { TermContainer } from "@luma-dev/my-unified/rehype-proc-term";

type TermProps = {
  readonly text: string;
  readonly reference: string;
  readonly refIndex?: number;
  readonly termContainer: TermContainer | null;
};

export default async function TermServer({
  text,
  reference,
  refIndex,
  termContainer,
}: TermProps): Promise<React.ReactElement> {
  const term = termDictMap[reference];
  if (term == null) {
    throw new Error(`No term found for ${JSON.stringify(reference)}`);
  }
  return (
    <TermClient
      text={text}
      reference={reference}
      term={term}
      showRuby={refIndex === 0}
      termContainer={termContainer}
    />
  );
}
