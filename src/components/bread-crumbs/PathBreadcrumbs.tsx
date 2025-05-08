"use server";
import PathBreadcrumbsClient from "./PathBreadcrumbsClient";

export type PathBreadcrumbsPart = {
  readonly href: string;
  readonly name: string;
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
      (arr: PathBreadcrumbsParts, p) => [
        ...arr.map((e) => ({
          ...e,
          href: `/${p}${e.href}`,
        })),
        {
          href: `/${p}`,
          name: p,
        },
      ],
      [],
    )
    .toReversed();

  return <PathBreadcrumbsClient parts={parts} />;
}
