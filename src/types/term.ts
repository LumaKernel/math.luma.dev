import {SrcMeta} from "./article";

export type TermReading = Readonly<{
  text: string;
  ruby?: string;
  ja_ruby?: string;
  slug: string;
}>;
export type TermDef = Readonly<{
  main: TermReading;
  alt: ReadonlyArray<TermReading>;
}>;
export type TermDict = ReadonlyArray<TermDef>;
export type TermMapPreset = Readonly<Record<string, string>>;
export type TermMapPredefinedPresets = Readonly<Record<string, TermMapPreset>>;
export type PreparseInput = Readonly<{
  mdx: string;
  termDict: TermDict;
  presets: TermMapPredefinedPresets;
  srcMeta: SrcMeta;
}>;
