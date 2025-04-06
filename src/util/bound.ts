export const bound = <
  K extends string,
  T extends Record<K, (...args: readonly never[]) => unknown>,
>(
  v: T,
  key: K
): T[K] => {
  const method = v[key];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-explicit-any
  return method.bind(v) as any;
};
