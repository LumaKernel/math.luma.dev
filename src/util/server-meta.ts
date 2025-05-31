/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MdxIndex } from "@/contents-index.gen";
import type { ArticleInfo, SrcMeta } from "@/types/article";
import type { PageInfo } from "./preparse";

export const makeComponents = (
  pageInfo: PageInfo,
  isProduction: boolean,
  usualComponents: Record<
    string,
    | ((props: any) => React.ReactElement | React.JSX.Element)
    | React.ExoticComponent
  >,
  serverComponents: Record<
    string,
    (props: any) => Promise<React.ReactElement | React.JSX.Element>
  >,
) => {
  const serverMeta: ServerMeta = {
    mdx: pageInfo.mdx,
    index: pageInfo.index,
    srcMeta: pageInfo.srcMeta,
    articleInfo: pageInfo.info,
    isProduction,
  };
  const serverComponentsHooked = Object.fromEntries(
    Object.entries(serverComponents).map(([key, Comp]) => [
      key,
      (props: any) => Comp({ ...props, serverMeta }),
    ]),
  );
  return { ...usualComponents, ...serverComponentsHooked };
};

export type ServerMeta = {
  readonly mdx: string;
  readonly index: MdxIndex;
  readonly srcMeta: SrcMeta;
  readonly articleInfo: ArticleInfo;
  readonly isProduction: boolean;
};

export type WithServerMeta<T> = T & {
  readonly serverMeta: ServerMeta;
};
