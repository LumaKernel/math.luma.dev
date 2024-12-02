import type { PageLocation, ParsedPage } from '@blogkit/next-config/src/main/processor-option';

export type { PageLocation, ParsedPage };
export interface SeriesConfig {
  tags: string[];
  order?: string[];
  chapterTemplate?: string;
}
export interface SeriesData {
  index: number;
  config: SeriesConfig;
}
export interface AllMetaData {
  pagesMetaData: ParsedPage[];
  pageLocation: PageLocation;
  metaDataDict: Record<string, ParsedPage | undefined>;
  currentMetaData: ParsedPage;
  folderLink: string;
  seriesData?: SeriesData;
}
