import H1 from "@/components/heading/H1.tsx";
import PathBreadcrumbs from "@/components/PathBreadcrumbs.tsx";
import SeriesNav from "@/components/series/SeriesNav.tsx";
import type { AllMetaData } from "@/types/article.ts";
import type { FC } from "react";
import MainLayout from "@/components/layouts/MainLayout.tsx";
import React from "react";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
  allMetaData: AllMetaData;
}

const ArticleLayout: FC<Props> = ({ children, allMetaData }) => {
  const { currentMetaData } = allMetaData;
  const { linkPath, subdomain } = currentMetaData.loc;
  const { title } = currentMetaData.pageConfig ?? {};
  const IpynbInfo: FC = () => {
    const pc = currentMetaData.pageConfig;
    if (!pc || !pc.isIpynb || !pc.ipynbRelPath) return <></>;
    const href =
      `https://github.com/LumaKernel/luma-notebooks/blob/main/${pc.ipynbRelPath}`;
    return (
      <Link href={href} passHref>
        <a target="_blank">source</a>
      </Link>
    );
  };
  return (
    <MainLayout>
      <H1>{title}</H1>
      <PathBreadcrumbs path={linkPath} subdomain={subdomain} />
      <IpynbInfo />
      <SeriesNav allMetaData={allMetaData} />
      {children}
      <SeriesNav allMetaData={allMetaData} />
    </MainLayout>
  );
};

export default ArticleLayout;
