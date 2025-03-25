"use client";
import React from "react";
import type { FC } from "react";
import GraphSvg from "@/components/svg/GraphSvg.tsx";
import { Knapsack, Prob1 } from "./_parts.tsx";

const Prob1Illust2: FC = () => {
  return (
    <GraphSvg
      width={60}
      height={25}
      viewBox="-90 -50 180 100"
      xmlns="http://www.w3.org/2000/svg"
      // grid={[5, 5]}
    >
      <Prob1.Load0 x={-70} y={-45} />
      <Prob1.Load1 x={-70} y={5} />
      <Prob1.Load2 x={-40} y={-40} />
      <Prob1.Load3 x={-10} y={-45} />
      <Prob1.Load4 x={-10} y={15} />
      <Prob1.Load5 x={20} y={-45} />
      <Knapsack x={50} y={-40} size={8} />
    </GraphSvg>
  );
};

export default Prob1Illust2;
