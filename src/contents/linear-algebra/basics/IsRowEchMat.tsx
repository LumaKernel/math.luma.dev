"use client";
import React from "react";
import Button from "@/components/button.tsx";
import MatWithPivot from "./MatWithPivot.tsx";
import { isPivotDescending, isZerosBelowNonZeros } from "@/components/lib/la.ts";
import { essentialOfChildren } from "@/components/lib/react.ts";
import Ng from "@/components/ng.tsx";
import Ok from "@/components/ok.tsx";
import type { FC } from "react";
import React, { useCallback, useMemo, useState } from "react";

const ResetOuter: FC<any> = (props) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        margin: 8px 8px;
      }
    `}</style>
  </>
);

const ResetInner: FC<any> = (props) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        padding: 2px 8px;
      }
    `}</style>
  </>
);

export type IsRowEchMatProps = {
  readonly init: number[][];
  readonly children: React.ReactNode[];
};
export default function IsRowEchMat({ init, children }: IsRowEchMatProps) {
  const es = essentialOfChildren(children);
  const [mat, setMat] = useState(init);

  const reset = useCallback(() => {
    setMat([...init]);
  }, [init]);

  const ok0 = useMemo(() => isPivotDescending(mat), [mat]);

  const ok1 = useMemo(() => isZerosBelowNonZeros(mat), [mat]);

  return (
    <div>
      <MatWithPivot
        mat={mat}
        onInput={(y, x, v) => {
          const newMat = [...mat];
          newMat[y] = [...newMat[y]];
          newMat[y][x] = v;
          setMat(newMat);
        }}
      />
      <ResetOuter>
        <Button onClick={reset}>
          <ResetInner>リセット</ResetInner>
        </Button>
      </ResetOuter>
      <div>
        {ok0 ? <Ok /> : <Ng />}
        {es[0]}
      </div>
      <div>
        {ok1 ? <Ok /> : <Ng />}
        {es[1]}
      </div>
    </div>
  );
}
