"use client";
import React from "react";
import type { FC } from "react";
import { Fragment, useState } from "react";
import GraphSvg from "@/components/svg/GraphSvg.tsx";
import { range } from "@/lib/number.ts";
import { Knapsack, Prob1 } from "./_parts.tsx";

const ansTable = range(Prob1.N + 1).map(() => range(Prob1.S + 1).map(() => 0));
range(1, Prob1.N + 1).forEach((n) => {
  range(1, Prob1.S + 1).forEach((s) => {
    const r = s - Prob1.x[n - 1];
    ansTable[n][s] = Math.max(
      r >= 0 ? ansTable[n - 1][r] + Prob1.v[n - 1] : -Infinity,
      ansTable[n - 1][s]
    );
  });
});

const Prob1StmtTable: FC = () => {
  const [curS, setCurS] = useState<number>(Prob1.S);
  const [curN, setCurN] = useState<number>(Prob1.N);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="column-head row-head">
              <i>S</i> \ <i>N</i>
            </th>
            {range(Prob1.N + 1).map((ni) => (
              <th key={ni}>{ni}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {range(Prob1.S + 1).map((si) => (
            <tr key={si}>
              <th>{si}</th>
              {range(Prob1.N + 1).map((ni) => {
                const isCur = si === curS && ni === curN;
                // const isSelectable = si !== 0 && ni !== 0;
                const isSelectable = true;
                const isBefore =
                  (si === curS && ni === curN - 1) ||
                  (si === curS - Prob1.x[curN - 1] && ni === curN - 1);
                const tdClassName = isSelectable ? "selectable" : "";
                const buttonClassName = `selector ${isCur ? "current" : ""} ${isSelectable ? "selectable" : ""} ${
                  isBefore ? "before" : ""
                }`;
                const ans = ansTable[ni][si];
                return (
                  <td className={tdClassName} key={ni}>
                    <button
                      disabled={!isSelectable}
                      onClick={() => {
                        setCurS(si);
                        setCurN(ni);
                      }}
                      className={buttonClassName}
                    >
                      {ans}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <GraphSvg
        width={60}
        height={25}
        viewBox="-90 -50 180 100"
        xmlns="http://www.w3.org/2000/svg"
        // grid={[5, 5]}
      >
        {[
          <Prob1.Load0 x={-70} y={-45} />,
          <Prob1.Load1 x={-70} y={5} />,
          <Prob1.Load2 x={-40} y={-40} />,
          <Prob1.Load3 x={-10} y={-45} />,
          <Prob1.Load4 x={-10} y={15} />,
          <Prob1.Load5 x={20} y={-45} />,
          <Prob1.Load6 x={20} y={25} />,
        ]
          .map((p, i) => <Fragment key={i}>{p}</Fragment>)
          .slice(0, curN)}
        <Knapsack x={50} y={-40} size={curS} />
      </GraphSvg>
      <style jsx>{`
        table {
          border: 2px solid;
          margin: 0 auto;
          border-collapse: collapse;
          font-size: 1.13rem;
        }
        th,
        td {
          border: 0.8px solid var(--color-border);
          border-collapse: collapse;
          padding: 0;
        }
        th.column-head.row-head {
          padding: 0.4em 0.9em;
        }
        button.selector:focus {
          outline: 3px dotted black;
        }
        button.selector {
          font-size: inherit;
          display: flex;
          width: 100%;
          height: 100%;
          padding: 0.4em 0.8em;
          border: none;
          justify-content: center;
          cursor: default;
          background-color: var(--color-bg-comment);
        }
        button.selector.selectable {
          cursor: pointer;
          background-color: var(--color-bg-rev-pri);
        }
        button.selector.current {
          background-color: var(--color-em1);
          outline: 3px solid var(--color-em1-dim);
        }
        button.selector.current:focus {
          outline-style: dotted;
        }
        button.selector.before {
          background-color: var(--color-em2);
        }
      `}</style>
    </div>
  );
};

export default Prob1StmtTable;
