export type PagefindOptions = {
  readonly baseUrl?: string;
  readonly basePath?: string;
  readonly excerptLength?: number;
  readonly highlightParam?: string;
};

export type PagefindApi = {
  readonly search: (
    searchInput: string,
    options?: PagefindOptions,
  ) => Promise<PagefindSearchSummary>;
  readonly init: () => Promise<void>;
  readonly options: (options?: PagefindOptions) => Promise<void>;
};

export type PagefindSearchSummary = {
  readonly results: readonly PagefindSearchResultItem[];
  readonly unfilteredResultCount: number;
  readonly filters: {};
  readonly totalFilters: {};
  readonly timings: readonly PagefindSearchTiming[];
};

export type PagefindSearchTiming = {
  readonly preload: number;
  readonly search: number;
  readonly total: number;
};

export type PagefindSearchResultItem = {
  /**
   * @example
   * ```
   * "en_57e2f2a"
   * ```
   */
  readonly id: "en_c457d51";
  /**
   * @example
   * ```
   * 23.086622
   * ```
   */
  readonly score: number;
  /**
   * @example
   * ```
   * [
   * 2,   5,   6,  11,  12,  13,  16,  17,  18,  20,
   * 21,  22,  23,  25,  26,  28,  30,  32,  34,  43,
   * ...
   * ]
   * ```
   */
  readonly words: readonly number[];
  readonly data: () => Promise<PagefindSearchResultData>;
};

export type PagefindSearchResultData = {
  readonly anchors: readonly Anchor[];
  readonly content: string;
  readonly excerpt: string;
  readonly filters: {};
  readonly locations: readonly number[];
  readonly meta: {
    readonly title: string;
  };
  readonly raw_content: string;
  readonly raw_url: string;
  readonly sub_results: readonly SubResult[];
  readonly url: string;
  readonly weighted_locations: readonly WeightedLocation[];
  readonly word_count: number;
};

type SubResult = {
  readonly title: string;
  readonly url: string;
  readonly weighted_locations: readonly WeightedLocation[];
  readonly locations: readonly number[];
  readonly excerpt: string;
};

type Anchor = {
  readonly element: string;
  readonly id: string;
  readonly text: string;
  readonly location: number;
};

type WeightedLocation = {
  // { weight: 0.125, balanced_score: 3.3181655, location: 2 },
  readonly weight: number;
  readonly balanced_score: number;
  readonly location: number;
};
