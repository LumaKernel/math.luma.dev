"use server";
import React from "react";
import MainLayout from "./MainLayout";
import PathBreadcrumbs from "@/components/bread-crumbs/PathBreadcrumbs";
import type { SrcMeta } from "@/types/article";
import FootSpacer from "./article-layout/FootSpacer";

type ArticleLayoutProps = React.PropsWithChildren<{
  readonly meta: SrcMeta;
}>;
export default async function ArticleLayout({
  meta,
  children,
}: ArticleLayoutProps) {
  return (
    <MainLayout>
      <PathBreadcrumbs path={meta.linkPath} />
      {children}
      <FootSpacer />
    </MainLayout>
  );
}
