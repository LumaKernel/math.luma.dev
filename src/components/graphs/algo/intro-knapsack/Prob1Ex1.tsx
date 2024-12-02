import type { FC } from 'react';
import GraphSvg from '@blogkit/blog-components/src/svg/GraphSvg';
import SvgNg from '@blogkit/blog-components/src/util/svg/SvgNg';
import { Knapsack, Prob1 } from './parts';

const Prob1Ex1: FC = () => {
  const X0 = -75;
  const X1 = -25;
  const X2 = 25;
  const X3 = 75;
  return (
    <GraphSvg width={60} height={35} viewBox="-140 -70 280 140" xmlns="http://www.w3.org/2000/svg" grid0={[5, 5]}>
      <Knapsack x={X0} y={-40} size={8} sum={5} />
      <Prob1.Load0 x={X0} y={10} put />
      <Prob1.Load1 x={X0} y={-20} put />
      <Prob1.Load6 x={X0} y={-30} put />
      <Knapsack x={X1} y={-40} size={8} sum={10} />
      <Prob1.Load3 x={X1} y={0} put />
      <Prob1.Load1 x={X1} y={-30} put />
      <Prob1.Load6 x={X1} y={-40} put />
      <Knapsack x={X2} y={-40} size={8} />
      <Prob1.Load1 x={X2} y={10} put />
      <Prob1.Load3 x={X2} y={-30} put />
      <Prob1.Load4 x={X2} y={-50} put />
      <SvgNg x={X2} y={55} size={10} />
      <Knapsack x={X3} y={-40} size={8} sum={11} />
      <Prob1.Load2 x={X3} y={-30} put />
      <Prob1.Load6 x={X3} y={-40} put />
    </GraphSvg>
  );
};

export default Prob1Ex1;
