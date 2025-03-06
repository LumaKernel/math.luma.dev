"use client";
import GraphSvg from "@/components/svg/GraphSvg";

const RowRect = (props: React.ComponentProps<"rect">) => (
  <>
    <rect {...props} />
    <style jsx>{`
      rect {
        fill: hsl(200deg 100% 90%);
        stroke: hsl(200deg 83% 51%);
        stroke-width: 0.4;
      }
      rect:hover {
        fill: hsl(200deg 100% 80%);
      }
    `}</style>
  </>
);

const ColumnRect = (props: React.ComponentProps<"rect">) => (
  <>
    <rect {...props} />
    <style jsx>{`
      rect {
        fill: hsl(30deg 100% 90%);
        stroke: hsl(30deg 83% 51%);
        stroke-width: 0.4;
      }
      rect:hover {
        fill: hsl(30deg 100% 80%);
      }
    `}</style>
  </>
);

const Gyou = () => (
  <>
    <text fontSize="60" alignmentBaseline="middle" textAnchor="middle">
      行
    </text>
    <RowRect width="32" height="10" x="-6" y="-25" />
  </>
);

const Retsu = () => (
  <>
    <text fontSize="60" alignmentBaseline="middle" textAnchor="middle">
      列
    </text>
    <ColumnRect width="6.3" height="40" x="11.4" y="-30" />
  </>
);

const Row = () => (
  <>
    <text fontSize="80" alignmentBaseline="middle" textAnchor="middle">
      R
    </text>
    <text
      fontSize="20"
      alignmentBaseline="baseline"
      textAnchor="left"
      y="22"
      x="22"
    >
      ow
    </text>
    <RowRect width="18" height="6" x="-8" y="18" />
  </>
);

const Column = () => (
  <>
    <text fontSize="80" alignmentBaseline="middle" textAnchor="middle">
      C
    </text>
    <text
      fontSize="20"
      alignmentBaseline="baseline"
      textAnchor="left"
      y="22"
      x="22"
    >
      olumn
    </text>
    <ColumnRect width="6.3" height="32.4" x="18" y="-24" />
  </>
);

export default function RememberRowColumnSvg() {
  const w = 80;
  const h = 16;
  const m = 6;
  const f = 0.7;
  // <rect width={m*w} height={m*h} fill="rgba(255,255,0,0.3)"/>
  // <rect x={-m*w/2} y={-m*h/2} width={m*w} height={m*h} fill="rgba(255,0,255,0.3)"/>
  return (
    <GraphSvg
      width={w}
      height={h}
      viewBox={`${(-m * w) / 2} ${(-m * h) / 2} ${m * w} ${m * h}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(-30 0)">
        <g transform={`translate(${m * w * f * (-0.5 + (1 / 8) * 1)} 8)`}>
          <Gyou />
        </g>
        <g transform={`translate(${m * w * f * (-0.5 + (1 / 8) * 3)} 8)`}>
          <Retsu />
        </g>
        <g transform={`translate(${m * w * f * (-0.5 + (1 / 8) * 5)} 8)`}>
          <Row />
        </g>
        <g transform={`translate(${m * w * f * (-0.5 + (1 / 8) * 7)} 8)`}>
          <Column />
        </g>
      </g>
    </GraphSvg>
  );
}
