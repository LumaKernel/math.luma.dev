"use server";
import PathBreadcrumbs from "@/components/PathBreadcrumbs";
import { getSeriesConfig } from "@/util/parse-series-config";
import { getPageInfo } from "@/util/preparse";
import { makeMake } from "../make-make";
import { resolveLinkPath } from "@/lib/link-path";
import { Option } from "@luma-dev/option-ts";

const renderChapter = (t: string, i: number) => {
  return t.replace(/\{n0\}/g, `${i}`).replace(/\{n1\}/g, `${i + 1}`);
};

const defaultTemplate = "第{n1}章: ";

export type SeriesProps = {
  readonly currentLinkPath: string;
  readonly link?: string;
};
export default async function Series({ currentLinkPath, link }: SeriesProps) {
  const linkPath = Option.fromNullish(link)
    .map((link) => resolveLinkPath(currentLinkPath, link))
    .unwrapOr(currentLinkPath);
  const seriesConifg = await getSeriesConfig(linkPath);
  const template = seriesConifg.chapterTemplate ?? defaultTemplate;
  const chapters = await Promise.all(
    seriesConifg.chapters.map(async (chapter) => {
      const chapterLinkPath = resolveLinkPath(linkPath, chapter);
      const pageInfo = await getPageInfo(chapterLinkPath);
      return pageInfo;
    }),
  );
  const pages = chapters.map((p, i) => {
    return (
      <li key={i}>
        <span>
          {renderChapter(template, i)}
          {p.info.meta.title}
        </span>
        <br />
        <span>
          <PathBreadcrumbs path={p.srcMeta.linkPath} />
        </span>
        <br />
      </li>
    );
  });
  return <ul>{pages}</ul>;
}

export const makeSeries = makeMake(Series);
