import type { PageLocation, ParsedPage } from "@/components/util/pages";
import { createContext, useContext } from "react";

const themes = ["system", "light", "dark"] as const;
export type Theme = (typeof themes)[number];

export interface PageMetaDataContextType {
  pageLocation: PageLocation;
  currentMetaData: ParsedPage;
}
export const PageMetaDataContext =
  createContext<null | PageMetaDataContextType>(null);

export const usePageMetaData = (
  initial: PageMetaDataContextType,
): PageMetaDataContextType => {
  return initial;
};

export const usePageMetaDataContext = () => {
  return useContext(PageMetaDataContext);
};
