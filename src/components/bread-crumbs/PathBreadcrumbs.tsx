"use server";
import PathBreadcrumbsClient from "./PathBreadcrumbsClient";
import { mdxIndex } from "@/contents-index.gen";

export type PathBreadcrumbsPart0 = {
  readonly linkPath: string;
  readonly name: string;
};
export type PathBreadcrumbsPart = PathBreadcrumbsPart0 & {
  readonly exists: boolean;
};
export type PathBreadcrumbsParts = readonly PathBreadcrumbsPart[];

export type PathBreadcrumbsProps = {
  readonly path: string;
};
export default async function PathBreadcrumbs({ path }: PathBreadcrumbsProps) {
  const parts = path
    .split("/")
    .toReversed()
    .reduce(
      (arr: readonly PathBreadcrumbsPart0[], p) => [
        ...arr.map((e) => ({
          ...e,
          linkPath: `${p}/${e.linkPath}`,
        })),
        {
          linkPath: `${p}`,
          name: p,
        },
      ],
      [],
    )
    .toReversed()
    .map(
      (e): PathBreadcrumbsPart => ({ ...e, exists: e.linkPath in mdxIndex }),
    );

  return <PathBreadcrumbsClient parts={parts} />;
}
