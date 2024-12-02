import H1 from '@blogkit/blog-components/src/h1';
import PathBreadcrumbs from '@blogkit/blog-components/src/path-breadcrumbs';
import SeriesNav from '@blogkit/blog-components/src/series-nav';
import type { AllMetaData } from '@blogkit/blog-components/src/types';
import type { FC } from 'react';
import MainLayout from '@blogkit/blog-components/src/layouts/main-layout';
import React from 'react';
import Link from 'next/link';

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
    const href = `https://github.com/LumaKernel/luma-notebooks/blob/main/${pc.ipynbRelPath}`;
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
