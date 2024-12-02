import type { FC } from 'react';
import PathBreadcrumbs from '@blogkit/blog-components/src/path-breadcrumbs';
import pagesMetaData from '@blogkit/blog-components/pages-metadata.json';
import ShowError from '@blogkit/blog-components/src/show-error';
import type { ParsedPage, SeriesConfig } from '@blogkit/blog-components/src/types';

const renderChapter = (t: string, i: number) => {
  return t.replace(/\{n0\}/g, `${i}`).replace(/\{n1\}/g, `${i + 1}`);
};

type Props = {
  path: string;
};

const Series: FC<Props> = ({ path }) => {
  const metaDataDict: Record<string, ParsedPage | undefined> = Object.fromEntries(
    pagesMetaData.map((m) => [m.loc.linkPath, m]),
  );
  const series: SeriesConfig = metaDataDict[`${path}/_series.yml`]!.yamlConfig;
  const defaultTemplate = '第{n1}章: ';
  const template = series.chapterTemplate ?? defaultTemplate;
  const pages = series
    .order!.map((pageName) => [pageName, metaDataDict[`${path}/${pageName}`]] as const)
    .map(([pageName, p], i) => {
      if (!p) {
        return (
          <li key={i}>
            <ShowError error={`Page path=${JSON.stringify(path)} file=${JSON.stringify(pageName)} not found`} />
          </li>
        );
      }
      return (
        <li key={i}>
          <span>
            {renderChapter(template, i)}
            {p.pageConfig?.title}
          </span>
          <br />
          <span>
            <PathBreadcrumbs path={p.loc.linkPath} subdomain={p.loc.subdomain} />
          </span>
          <br />
        </li>
      );
    });
  return <ul>{pages}</ul>;
};

export default Series;
