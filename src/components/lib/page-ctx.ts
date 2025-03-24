import type { PageSymbol } from "@/types/index.ts";

declare const pageKeySymbol: unique symbol;
type PageKey<T> = { [pageKeySymbol]: T };

export interface PageValueAccessor<T> {
  set(v: T): T;
  get(): T;
}

export const createPageKey = <T>(): PageKey<T> => {
  if (typeof window !== 'undefined') return '' as any;
  return Symbol('page key') as any;
};

export const createPageValueAccessor = <T>(
  pageCtx0: PageSymbol,
  key0: PageKey<T>,
  defaultValue: T,
): PageValueAccessor<T> => {
  if (typeof window !== 'undefined') throw new Error('createPageValueAccessor cannot be used in browser environment');
  const pageCtx: any = pageCtx0 as any;
  const key: symbol = key0 as any;
  if (pageCtx[key] === undefined) {
    pageCtx[key] = defaultValue;
  }
  return {
    set: (v) => {
      pageCtx[key] = v;
      return v;
    },
    get: () => pageCtx[key],
  };
};
