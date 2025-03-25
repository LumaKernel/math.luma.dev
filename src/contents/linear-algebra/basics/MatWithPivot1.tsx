"use client";
import React, { useCallback, useMemo } from "react";
import { matShape, range } from "@/lib/number.ts";
import { cssColors } from "@/lib/colors.ts";
import MatElemInput from "./MatElemInput.tsx";
import type { CreateEelem } from "./MatViewer.tsx";
import MatViewer from "./MatViewer.tsx";

export type MatWithPivot1Props = {
  readonly mat: number[][];
  readonly onInput?: (y: number, x: number, newValue: number) => void;
};

export default function MatWithPivot1({ mat, onInput }: MatWithPivot1Props) {
  const colorsMat = useMemo(() => {
    const [n, m] = matShape(mat);
    const tmp = mat.map((row) =>
      row.map(() => undefined as undefined | string)
    );
    for (const y of range(n)) {
      for (const x of range(m)) {
        if (mat[y][x] !== 0) {
          if (mat[y][x] === 1) {
            tmp[y][x] = `${cssColors.text}`;
          } else {
            tmp[y][x] = `${cssColors.em2}`;
          }
          break;
        }
      }
    }
    return tmp;
  }, [mat]);

  const createElem = useCallback<CreateEelem>(
    (y, x) => {
      const v = mat[y][x];
      return (
        <MatElemInput
          value={v}
          emphasis={colorsMat[y][x]}
          onInput={(newValue) => {
            onInput?.(y, x, newValue);
          }}
        />
      );
    },
    [mat],
  );

  const [n, m] = useMemo(() => matShape(mat), [mat]);

  return <MatViewer n={n} m={m} createElem={createElem} />;
}
