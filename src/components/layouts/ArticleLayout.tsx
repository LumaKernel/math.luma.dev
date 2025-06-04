"use server";
import React from "react";
import MainLayout from "./MainLayout";
import PathBreadcrumbs from "@/components/bread-crumbs/PathBreadcrumbs";
import FootSpacer from "./article-layout/FootSpacer";
import H1 from "../heading/H1";
import type { WithServerMeta } from "@/util/server-meta";

type ArticleLayoutProps = WithServerMeta<{
  readonly children: React.ReactNode;
}>;
export default async function ArticleLayout({
  serverMeta: {
    srcMeta,
    articleInfo: {
      meta: { title },
    },
  },
  children,
}: ArticleLayoutProps) {
  return (
    <MainLayout>
      <PathBreadcrumbs path={srcMeta.linkPath} />
      <H1>{title}</H1>
      {children}
      <FootSpacer />
    </MainLayout>
  );
}
