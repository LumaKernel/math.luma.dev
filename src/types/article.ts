/**
 * MDXの先頭にあるtomlのメタ
 */
export type ArticleMeta = Readonly<{
  published: boolean;
  title: string;
  // 使わないものは省略
}>;

export type ArticleInfo = Readonly<{
  meta: ArticleMeta;
  contents: string;
}>;

export type SrcMeta = Readonly<{
  /**
   * contents/フォルダからの相対パス
   */
  originalPath: string;
  linkPath: string;
}>;
