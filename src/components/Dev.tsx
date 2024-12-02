import type { FC } from 'react';
import React from 'react';

interface Props {
  children: React.ReactElement;
}

const Dev: FC<Props> = ({ children }) => {
  if (process.env.NODE_ENV !== 'development') return <></>;
  return children;
};

export default Dev;
