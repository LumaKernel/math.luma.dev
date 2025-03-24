import React from "react";
import type { FC } from 'react';
import ShowError from "@/components/show-error.ts";
import { quickTerms } from "@/lib/quick-term-dict.ts";
import Term from "@/components/term.ts";

type Props = {
  w: string;
  /** no ruby */
  s?: boolean;
  /** skip counting */
  k?: boolean;
  /** only show first definition */
  o?: boolean;
  isFirst?: boolean;
};

const QuickTerm: FC<Props> = ({ w, s, k, o, isFirst }) => {
  const def = quickTerms[w];
  if (!w || def == null) {
    return <ShowError error={`Quick term "${w}" not found.`} />;
  }
  const slug = def.slug || w;
  if (!s && isFirst && !k && def.ruby) {
    const text = typeof def.short === 'string' ? `${def.text} (${def.short})` : def.text;
    if (o || !def.others || def.others.length === 0) {
      return <Term ruby={def.ruby} jaRuby={def.jaRuby} children={text} slug={slug} />;
    }

    return (
      <>
        <Term ruby={def.ruby} jaRuby={def.jaRuby} children={text} slug={slug} />（
        {def.others
          .map((oth) => <Term ruby={oth.ruby} jaRuby={oth.jaRuby} children={oth.text} />)
          .flatMap((e) => [e, '、'])
          .slice(0, -1)}
        ）
      </>
    );
  }
  if (typeof def.short === 'string') {
    return <Term children={def.short} title={def.text} slug={slug} />;
  }
  return <Term children={def.text} slug={slug} />;
};

export default QuickTerm;
