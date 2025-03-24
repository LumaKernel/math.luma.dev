import React from "react";
import type { FC } from 'react';

export interface Props {
  x: number;
  y: number;
  size: number;
}
const SvgNg: FC<Props> = ({ x, y, size }) => {
  const w = size * 0.1;
  return (
    <>
      <g transform={`translate(${x},${y}) rotate(45)`}>
        <g transform={`translate(-${size / 2},-${w / 2})`}>
          <rect width={size} height={w} rx={w} />
        </g>
        <g transform={`translate(-${w / 2},-${size / 2})`}>
          <rect width={w} height={size} rx={w} />
        </g>
      </g>
      <style jsx>{`
        rect {
          fill: red;
        }
      `}</style>
    </>
  );
};

export default SvgNg;
