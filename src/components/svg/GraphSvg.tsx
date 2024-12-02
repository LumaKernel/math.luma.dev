import type { FC } from 'react';
import SvgGrid from '@blogkit/blog-components/src/util/svg/SvgGrid';

const GraphSvg: FC<any> = ({ children, grid, ...props }) => (
  <>
    <svg {...props}>
      {grid && <SvgGrid grid={grid} />}
      {children}
    </svg>
    <style jsx>{`
      svg {
        width: 100%;
        height: auto;
        font-family: 'Noto Sans JP', 'Inconsolata';
        font-weight: 400;
      }
    `}</style>
  </>
);

export default GraphSvg;
