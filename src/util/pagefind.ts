const attrObj = (attr: string) => Object.freeze({ [attr]: attr });

export const pagefindAttrs = Object.freeze({
  body: attrObj("data-pagefind-body"),
  ignore: attrObj("data-pagefind-ignore"),
} as const);
