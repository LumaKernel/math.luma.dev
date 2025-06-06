"use server";
import PathBreadcrumbs from "@/components/bread-crumbs/PathBreadcrumbs";
import ShowError from "@/components/show-error";

export type LinkToPathProps = {
  readonly href?: string;
};
export default async function LinkToPath({ href }: LinkToPathProps) {
  if (!href) return <ShowError error={"Href not set"} />;
  try {
    //const pageMetaData = pagesMetaData.find((m) => m.loc.subdomain === subdomain && m.loc.linkPath === href)!;
    //const title = pageMetaData.pageConfig?.title;
    const title = "TODO";
    return (
      <div>
        <span>{title}</span>
        <PathBreadcrumbs path={href} />
      </div>
    );
  } catch (e: unknown) {
    return (
      <div>
        <ul>
          <li>href: {href}</li>
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
}
