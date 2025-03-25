export type Vector<T> = readonly T[];
export type Matrix<T> = readonly Vector<T>[];

export type MapperFn<T> = (y: number, x: number, v: T) => T;
export const matMap = <T>(mat: Matrix<T>, mapper: MapperFn<T>): Matrix<T> => {
  return mat.map((row, y) => row.map((v, x) => mapper(y, x, v)));
};
export const matSet = <T>(
  mat: Matrix<T>,
  y: number,
  x: number,
  v: T,
): Matrix<T> => {
  return mat.map((
    row,
    yy,
  ) => (yy === y ? row.map((vv, xx) => (xx === x ? v : vv)) : row));
};
export const matRow = <T>(mat: Matrix<T>, i: number): Vector<T> => {
  return mat[i];
};
export const matColumn = <T>(mat: Matrix<T>, j: number): Vector<T> => {
  return mat.map((row) => row[j]);
};
