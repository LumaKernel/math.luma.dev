import type { FC } from 'react';
import PathBreadcrumbs from '@blogkit/blog-components/src/path-breadcrumbs';
import ShowError from '@blogkit/blog-components/src/show-error';
import pagesMetaData from '@blogkit/blog-components/pages-metadata.json';
import type { Subdomain } from '@blogkit/next-config/src/main/processor-option';

type Props = {
  href?: string;
  subdomain: Subdomain;
};

const LinkToPath: FC<Props> = ({ href, subdomain }) => {
  if (!href) return <ShowError error={'Href not set'} />;
  try {
    const pageMetaData = pagesMetaData.find((m) => m.loc.subdomain === subdomain && m.loc.linkPath === href)!;
    const title = pageMetaData.pageConfig?.title;
    return (
      <div>
        <span>{title}</span>
        <PathBreadcrumbs path={href} subdomain={subdomain} />
      </div>
    );
  } catch (e: unknown) {
    return (
      <div>
        <ul>
          <li>href: {href}</li>
          <li>subdomain: {subdomain}</li>
        </ul>
        <ShowError error={e} />
      </div>
    );
  }
  // metaDataDict[`${path}/${f}`]
  // return <div>
  //   <span>
  //     第{i + 1}章: {p.pageConfig?.title}
  //   </span>
  //   <br />
  //   <span>
  //     <PathBreadcrumbs path={p.loc.linkPath} subdomain={p.loc.subdomain} />
  //   </span>
  //   <br />
  // </div>
};

export default LinkToPath;
