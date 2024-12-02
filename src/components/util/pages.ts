import type { Props as PageConfig } from '@blogkit/blog-components/src/config';

export const locEq = (loc1: PageLocation, loc2: PageLocation): boolean => {
  return loc1.filePath === loc2.filePath;
};

export type { PageConfig };

export interface ParsedPage {
  loc: PageLocation;
  pageConfig?: PageConfig;
  yamlConfig?: any;
}

export interface PageLocation {
  // ex: foo/bar
  linkPath: string;
  // ex: foo/bar.mdx
  filePath: string;
  // ex: /dir/to/proj/www/subdom/contents/foo/bar.mdx
  fullOrigFilePath: string;
  // ex: /dir/to/proj/www/subdom/src/pages/foo/bar.mdx
  fullTargetFilePath: string;
}
