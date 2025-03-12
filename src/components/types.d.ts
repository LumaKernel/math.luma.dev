export interface SeriesData {
  index: number;
  //config: SeriesConfig;
}
export interface AllMetaData {
  pagesMetaData: ParsedPage[];
  pageLocation: PageLocation;
  metaDataDict: Record<string, ParsedPage | undefined>;
  currentMetaData: ParsedPage;
  folderLink: string;
  seriesData?: SeriesData;
}
