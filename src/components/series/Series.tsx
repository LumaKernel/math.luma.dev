"use server";
import PathBreadcrumbs from "@/components/bread-crumbs/PathBreadcrumbs";
import { getSeriesConfig } from "@/util/parse-series-config";
import { getPageInfo } from "@/util/preparse";
import { resolveLinkPath } from "@/lib/link-path";
import { Option } from "@luma-dev/option-ts";
import { pagefindAttrs } from "@/util/pagefind";
import type { WithServerMeta } from "@/util/server-meta";

const renderChapter = (t: string, i: number) => {
  return t.replace(/\{n0\}/g, `${i}`).replace(/\{n1\}/g, `${i + 1}`);
};

const defaultTemplate = "第{n1}章: ";

export type SeriesNeedingInfoProps = WithServerMeta<{
  readonly link?: string;
}>;
export default async function SeriesNeedingInfo({
  serverMeta: {
    srcMeta: { linkPath: currentLinkPath },
  },
  link,
}: SeriesNeedingInfoProps) {
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
  return <ul {...pagefindAttrs.ignoreAll}>{pages}</ul>;
}
