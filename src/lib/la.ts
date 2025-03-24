import { matShape, range } from "@/components/lib/number.ts";

export type Mat = readonly (readonly number[])[];

interface PivotInMat {
  i: number;
  j: number;
  v: number;
}
export const extractPivots = (mat: Mat): PivotInMat[] => {
  const res: PivotInMat[] = [];
  const [n, m] = matShape(mat);
  for (const i of range(n))
    for (const j of range(m)) {
      if (mat[i][j] !== 0) {
        res.push({
          i,
          j,
          v: mat[i][j],
        });
        break;
      }
    }
  return res;
};

/** 主成分右肩下がり */
export const isPivotDescending = (mat: Mat): boolean => {
  const [n, m] = matShape(mat);
  let last = -1;
  for (const i of range(n))
    for (const j of range(m)) {
      if (mat[i][j] !== 0) {
        if (last >= j) return false;
        last = j;
        break;
      }
    }
  return true;
};

/** 0が非ゼロより下 */
export const isZerosBelowNonZeros = (mat: Mat): boolean => {
  let lastNonZero = -Infinity;
  let firstZero = Infinity;
  const [n, m] = matShape(mat);
  for (const i of range(n)) {
    const isZero = range(m).reduce(
      (accum, j) => accum && mat[i][j] === 0,
      true
    );
    if (isZero) firstZero = Math.min(firstZero, i);
    if (!isZero) lastNonZero = Math.max(lastNonZero, i);
  }
  return lastNonZero < firstZero;
};

export const isRowEchelonMatrix = (mat: Mat): boolean =>
  isPivotDescending(mat) && isZerosBelowNonZeros(mat);

export const isAllPivotsAre1 = (mat: Mat): boolean => {
  return extractPivots(mat).reduce<boolean>(
    (accum, { v }) => accum && v === 1,
    true
  );
};

export const isOthersAre0InPivotColumn = (mat: Mat): boolean => {
  const [n] = matShape(mat);
  return extractPivots(mat).reduce<boolean>(
    (accum, { j, i: pivotI }) =>
      accum &&
      range(n).reduce<boolean>(
        (accum, i) => accum && (mat[i][j] === 0 || i === pivotI),
        true
      ),
    true
  );
};
