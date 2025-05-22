const attrObj = (attr: string) => Object.freeze({ [attr]: attr });
const attrValueObs = (attr: string, value: string) =>
  Object.freeze({ [attr]: value });

export const pagefindAttrs = Object.freeze({
  body: attrObj("data-pagefind-body"),
  ignoreIndex: attrValueObs("data-pagefind-ignore", "index"),
  ignoreAll: attrValueObs("data-pagefind-ignore", "all"),
} as const);
