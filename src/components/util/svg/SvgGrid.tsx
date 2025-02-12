"use client";
import type { FC } from "react";
import { range } from "@/lib/number";

export interface Props {
  grid: [number, number];
}
const SvgGrid: FC<Props> = ({ grid }) => {
  const W = 0.1;
  const N = 20;
  return (
    <>
      <defs>
        <linearGradient id="debugGradiantHoriz" gradientTransform="rotate(0)">
          <stop offset="0%" stop-color="hsl(0deg 100% 50%)" />
          <stop offset="25%" stop-color="hsl(90deg 100% 50%)" />
          <stop offset="50%" stop-color="hsl(180deg 100% 50%)" />
          <stop offset="75%" stop-color="hsl(270deg 100% 50%)" />
          <stop offset="100%" stop-color="hsl(360deg 100% 50%)" />
        </linearGradient>
        <linearGradient id="debugGradiantVert" gradientTransform="rotate(90)">
          <stop offset="0%" stop-color="hsl(0deg 100% 50%)" />
          <stop offset="25%" stop-color="hsl(90deg 100% 50%)" />
          <stop offset="50%" stop-color="hsl(180deg 100% 50%)" />
          <stop offset="75%" stop-color="hsl(270deg 100% 50%)" />
          <stop offset="100%" stop-color="hsl(360deg 100% 50%)" />
        </linearGradient>
      </defs>
      {range(-N, N).map((x) => (
        <rect
          key={x}
          className="vert"
          x={x * grid[0] - W}
          width={W * 2}
          y="-50%"
          height="100%"
        />
      ))}
      {range(-N, N).map((x) => (
        <rect
          key={x}
          className="horiz"
          y={x * grid[1] - W}
          height={W * 2}
          x="-50%"
          width="100%"
        />
      ))}
      <style jsx>{`
        rect.vert {
          fill: url(#debugGradiantVert) !important;
        }
        rect.horiz {
          fill: url(#debugGradiantHoriz) !important;
        }
      `}</style>
    </>
  );
};
export default SvgGrid;
