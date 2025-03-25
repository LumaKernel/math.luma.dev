export const clampInAbs10Number = (n: unknown): number => {
  const k = Math.round(Number.parseInt(String(n), 10)) | 0;
  if (k < -9) return -9;
  if (k > 9) return 9;
  return k;
};

export const clampInAbs100Number = (n: unknown): number => {
  const k = Math.round(Number.parseInt(String(n), 10)) | 0;
  if (k < -99) return -99;
  if (k > 99) return 99;
  return k;
};

export const range = (n: number, m?: number): number[] => {
  if (m == null) {
    return Array(n)
      .fill(0)
      .map((_, i) => i);
  }
  if (m < n) return [];
  return Array(m - n)
    .fill(0)
    .map((_, i) => n + i);
};

export const matShape = (
  mat: readonly (readonly unknown[])[],
): [number, number] => {
  return [mat.length, mat[0].length];
};

export const gcdNumber = (n: number, m: number): number => {
  return m === 0 ? n : gcdNumber(m, n % m);
};
