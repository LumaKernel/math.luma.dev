"use client";
import React from "react";
import { cssColors } from "@/lib/colors.ts";
import { range } from "@/lib/number.ts";
import { usePrefixedFlipped } from "@/components/graphs/prefixed-flipped.tsx";

const Wrapper = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>
      {`
      div {
        display: inline-block;
        position: relative;
        padding: 10px 10px;
      }
    `}
    </style>
  </>
);

const Grid = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>
      {`
      div {
        display: grid;
      }
    `}
    </style>
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

const SquareBraWrapper = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>
      {`
      div {
        ${squareBraketWrapperStyle}
        left: 2px;
      }
    `}
    </style>
  </>
);

const SquareKetWrapper = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>
      {`
      div {
        ${squareBraketWrapperStyle}
        right: 6px;
      }
    `}
    </style>
  </>
);

const squareBraketStyle = `
  height: 100%;
  width: 100%;
  border-top: ${bracketBorder};
  border-bottom: ${bracketBorder};
`;

const SquareBra = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>
      {`
      div {
        ${squareBraketStyle}
        border-left: ${bracketBorder};
      }
    `}
    </style>
  </>
);

const SquareKet = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>
      {`
      div {
        ${squareBraketStyle}
        border-right: ${bracketBorder};
      }
    `}
    </style>
  </>
);

export type CreateEelem = (y: number, x: number) => React.ReactElement;
export type MatViewerProps = {
  readonly n: number;
  readonly m: number;
  readonly createElem: CreateEelem;
  readonly flipIdPrefix?: string | null;
};
export default function MatViewer({
  n,
  m,
  createElem,
  flipIdPrefix,
}: MatViewerProps) {
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
          range(m).map((x) => (
            <React.Fragment key={`${y},${x}`}>
              {createElem(y, x)}
            </React.Fragment>
          ))
        )}
      </Grid>
    </Wrapper>
  );
}
