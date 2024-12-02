import type { FC } from 'react';
import printf from 'printf';

type Props = {
  w: string;
  template: string;
  start: number;
  countJson: string;
};

const Counter: FC<Props> = ({ countJson, start, template }) => {
  const count: number = JSON.parse(countJson);
  const c = start + count;
  const numStr = c.toString();
  const str = printf(template, numStr);
  return <span>{str}</span>;
};

export default Counter;
