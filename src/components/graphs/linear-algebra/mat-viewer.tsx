import type { FC } from 'react';
import React from 'react';
import { cssColors } from '@blogkit/blog-components/src/lib/colors';
import { range } from '../../lib/number';
import { usePrefixedFlipped } from '../prefixed-flipped';

const Wrapper: FC<any> = (props) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        display: inline-block;
        position: relative;
        padding: 10px 10px;
      }
    `}</style>
  </>
);

const Grid: FC<any> = (props) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        display: grid;
      }
    `}</style>
  </>
);

const bracketBorder = `2px solid ${cssColors.text}`;

const squareBraketWrapperStyle = `
  box-sizing: border-box;
  margin: 0;
  padding: 10px 0;
  position: absolute;
  top: -6px;
  height: calc(100% + 10px);
  width: 4px;
`;

const SquareBraWrapper: FC<any> = (props) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        ${squareBraketWrapperStyle}
        left: 2px;
      }
    `}</style>
  </>
);

const SquareKetWrapper: FC<any> = (props) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        ${squareBraketWrapperStyle}
        right: 6px;
      }
    `}</style>
  </>
);

const squareBraketStyle = `
  height: 100%;
  width: 100%;
  border-top: ${bracketBorder};
  border-bottom: ${bracketBorder};
`;

const SquareBra: FC<any> = (props) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        ${squareBraketStyle}
        border-left: ${bracketBorder};
      }
    `}</style>
  </>
);

const SquareKet: FC<any> = (props) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        ${squareBraketStyle}
        border-right: ${bracketBorder};
      }
    `}</style>
  </>
);

export type CreateEelem = (y: number, x: number) => React.ReactElement;
interface Props {
  n: number;
  m: number;
  createElem: CreateEelem;
  flipIdPrefix?: string | null;
}
const MatViewer: FC<Props> = ({ n, m, createElem, flipIdPrefix }) => {
  const PrefixedFlipped = usePrefixedFlipped(flipIdPrefix);
  return (
    <Wrapper>
      <PrefixedFlipped flipId="bra">
        <SquareBraWrapper>
          <SquareBra />
        </SquareBraWrapper>
      </PrefixedFlipped>
      <PrefixedFlipped flipId="ket">
        <SquareKetWrapper>
          <SquareKet />
        </SquareKetWrapper>
      </PrefixedFlipped>
      <Grid style={{ gridTemplateColumns: `repeat(${m},1fr)` }}>
        {range(n).flatMap((y) =>
          range(m).map((x) => <React.Fragment key={`${y},${x}`}>{createElem(y, x)}</React.Fragment>),
        )}
      </Grid>
    </Wrapper>
  );
};

export default MatViewer;
