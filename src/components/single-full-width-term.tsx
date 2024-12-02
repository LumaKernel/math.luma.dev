import type { FC } from 'react';
import type { QuickTermSingle } from '@blogkit/blog-components/src/lib/quick-term-dict';
import Term from '@blogkit/blog-components/src/term';

type Props = {
  def: QuickTermSingle;
};

const SingleFullWidthTerm: FC<Props> = ({ def }) => {
  return <Term ruby={def.ruby} children={def.text} />;
};

export default SingleFullWidthTerm;
