import type { FC } from 'react';
import React, { useMemo, useCallback } from 'react';
import { matShape, range } from '@blogkit/blog-components/src/lib/number';
import { cssColors } from '@blogkit/blog-components/src/lib/colors';
import MatElemInput from './mat-elem-input';
import type { CreateEelem } from './mat-viewer';
import MatViewer from './mat-viewer';

interface Props {
  mat: number[][];
  onInput?: (y: number, x: number, newValue: number) => void;
}
const MatWithPivot1: FC<Props> = ({ mat, onInput }) => {
  const colorsMat = useMemo(() => {
    const [n, m] = matShape(mat);
    const tmp = mat.map((row) => row.map(() => undefined as undefined | string));
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
};

export default MatWithPivot1;
