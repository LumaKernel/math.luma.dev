import React from "react";
import type { FC } from "react";
import PathBreadcrumbs from "@/components/path-breadcrumbs.ts";
import ShowError from "@/components/show-error.ts";
// import pagesMetaData from '@blogkit/blog-components/pages-metadata.json' - Commented for Deno compatibility
const pagesMetaData: any[] = [];
import type { Subdomain } from "@/types/index.ts";

type Props = {
  href?: string;
  subdomain: Subdomain;
};

const LinkToPath: FC<Props> = ({ href, subdomain }) => {
  if (!href) return <ShowError error={"Href not set"} />;
  try {
    const pageMetaData = pagesMetaData.find((m) =>
      m.loc.subdomain === subdomain && m.loc.linkPath === href
    )!;
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
