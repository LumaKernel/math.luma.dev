import React from "react";
import type { FC } from "react";
import type { QuickTermSingle } from "@/lib/quick-term-dict.ts";
import Term from "@/components/term/TermServer.tsx";

type Props = {
  def: QuickTermSingle;
};

const SingleFullWidthTerm: FC<Props> = ({ def }) => {
  return <Term ruby={def.ruby} children={def.text} />;
};

export default SingleFullWidthTerm;
