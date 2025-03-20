"use server";
import { termDictMap } from "@/terms-index.gen";
import TermClient from "./TermClient";

type TermProps = {
  readonly text: string;
  readonly reference: string;
};

// eslint-disable-next-line @typescript-eslint/require-await
export default async function TermServer({
  text,
  reference,
}: TermProps): Promise<React.ReactElement> {
  const term = termDictMap[reference];
  if (term == null) {
    throw new Error(`No term found for ${JSON.stringify(reference)}`);
  }
  return <TermClient text={text} reference={reference} term={term} />;
}
