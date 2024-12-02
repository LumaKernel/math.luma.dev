import type { FC } from 'react';
import { range } from '../../../lib/number';

export const COLOR = {
  a: '#3eeeae',
  b: '#eeae3e',
  c: '#ee3eae',
  d: '#339ee3',
  e: '#9e33e3',
};

const WIDTH = 20;
const PER_SIZE = 10;

export interface KnapsackProps {
  x: number;
  y: number;
  size: number;
  sizeOver?: number;
  sum?: number;
}
export const Knapsack: FC<KnapsackProps> = ({ x, y, size, sizeOver, sum }) => {
  const B = 2;
  return (
    <>
      <rect x={x - WIDTH / 2 - B} y={y} width={WIDTH + B * 2} height={size * PER_SIZE + B} fill="gray" />
      <rect x={x - WIDTH / 2} y={y} width={WIDTH} height={size * PER_SIZE} fill="#e4e4e4" />
      {range(size).map((i) => {
        return (
          <line
            x1={x - WIDTH / 2}
            x2={x - WIDTH / 2 + WIDTH}
            y1={y + i * PER_SIZE}
            y2={y + i * PER_SIZE}
            strokeDasharray="0.8,0.4"
            stroke="black"
            stroke-width={0.2}
          />
        );
      })}
      <text
        x={x}
        y={y + size * PER_SIZE + 4}
        fontSize={5}
        fill="white"
        textAnchor="middle"
        alignmentBaseline="mathematical"
      >
        <tspan alignmentBaseline="mathematical" fontStyle="italic">
          S
        </tspan>{' '}
        ＝ {sizeOver ?? size}
      </text>
      {sum != null && (
        <text
          x={x}
          y={y + size * PER_SIZE + 10}
          fontSize={5}
          fill="white"
          textAnchor="middle"
          alignmentBaseline="mathematical"
        >
          Σ
          <tspan alignmentBaseline="mathematical" fontStyle="italic">
            v
          </tspan>
          <tspan baseline-shift="sub" fontSize={2.4} fontStyle="italic" alignmentBaseline="mathematical">
            i
          </tspan>{' '}
          ＝ {sum}
        </text>
      )}
    </>
  );
};

export interface LoadProps {
  i: number;
  x: number;
  y: number;
  size: number;
  value: number;
  color: string;
  put?: boolean;
  dim?: boolean;
}
export const Load: FC<LoadProps> = ({ i, x, y, size, value, color, put, dim }) => {
  const B = 0.8;
  return (
    <>
      <rect x={x - WIDTH / 2} y={y} width={WIDTH} height={size * PER_SIZE} fill={color} />
      <rect x={x - WIDTH / 2} y={y} width={WIDTH} height={size * PER_SIZE} opacity={0.2} fill="black" />
      <rect x={x - WIDTH / 2 + B} y={y + B} width={WIDTH - B * 2} height={size * PER_SIZE - B * 2} fill={color} />
      {dim && (
        <>
          <rect x={x - WIDTH / 2} y={y} width={WIDTH} height={size * PER_SIZE} opacity={0.7} fill="white" />
          <rect x={x - WIDTH / 2} y={y} width={WIDTH} height={size * PER_SIZE} opacity={0.7} fill="black" />
        </>
      )}
      {range(size).map((i) => {
        if (i === 0) return null;
        return (
          <line
            x1={x - WIDTH / 2}
            x2={x - WIDTH / 2 + WIDTH}
            y1={y + i * PER_SIZE}
            y2={y + i * PER_SIZE}
            strokeDasharray="0.8,0.4"
            stroke="black"
            stroke-width={0.2}
          />
        );
      })}
      <g transform={put ? `translate(-${WIDTH + 1},-15)` : ''}>
        {!put && (
          <text
            x={x}
            y={y + size * PER_SIZE + 3}
            fontSize={5}
            fill="white"
            textAnchor="middle"
            alignmentBaseline="mathematical"
          >
            <tspan alignmentBaseline="mathematical" fontStyle="italic">
              x
            </tspan>
            <tspan baseline-shift="sub" fontSize={2.4} alignmentBaseline="mathematical">
              {i}
            </tspan>{' '}
            ＝ {size}
          </text>
        )}
        <text
          x={x}
          y={y + size * PER_SIZE + 8}
          fontSize={5}
          fill="white"
          textAnchor="middle"
          alignmentBaseline="mathematical"
        >
          <tspan alignmentBaseline="mathematical" fontStyle="italic">
            v
          </tspan>
          <tspan baseline-shift="sub" fontSize={2.4} alignmentBaseline="mathematical">
            {i}
          </tspan>{' '}
          ＝ {value}
        </text>
      </g>
    </>
  );
};

type LoadIProps = Pick<LoadProps, 'x' | 'y' | 'put' | 'dim'>;
export const Prob1 = {
  Load0: (ps: LoadIProps) => <Load i={0} {...ps} size={3} color={COLOR.a} value={1} />,
  Load1: (ps: LoadIProps) => <Load i={1} {...ps} size={3} color={COLOR.b} value={3} />,
  Load2: (ps: LoadIProps) => <Load i={2} {...ps} size={7} color={COLOR.c} value={10} />,
  Load3: (ps: LoadIProps) => <Load i={3} {...ps} size={4} color={COLOR.d} value={6} />,
  Load4: (ps: LoadIProps) => <Load i={4} {...ps} size={2} color={COLOR.a} value={1} />,
  Load5: (ps: LoadIProps) => <Load i={5} {...ps} size={5} color={COLOR.b} value={6} />,
  Load6: (ps: LoadIProps) => <Load i={6} {...ps} size={1} color={COLOR.e} value={1} />,
  S: 8,
  N: 7,
  x: [3, 3, 7, 4, 2, 5, 1],
  v: [1, 3, 10, 6, 1, 6, 1],
} as const;
