"use client";
import type { FC } from "react";
import SvgGrid from "@/components/util/svg/SvgGrid";

type GraphSvgProps = Readonly<
  React.PropsWithChildren<
    {
      grid?: [number, number];
    } & React.ComponentProps<"svg">
  >
>;
const GraphSvg: FC<GraphSvgProps> = ({ children, grid, ...props }) => (
  <>
    <svg {...props}>
      {grid && <SvgGrid grid={grid} />}
      {children}
    </svg>
    <style jsx>{`
      svg {
        width: 100%;
        height: auto;
        font-family: "Noto Sans JP", "Inconsolata";
        font-weight: 400;
      }
    `}</style>
  </>
);
export default GraphSvg;
