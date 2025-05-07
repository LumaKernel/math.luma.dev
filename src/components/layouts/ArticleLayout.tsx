"use client";

import React from "react";
import MainLayout from "./MainLayout";
import PathBreadcrumbs from "@/components/bread-crumbs/PathBreadcrumbs";
import type { SrcMeta } from "@/types/article";

type ArticleLayoutProps = React.PropsWithChildren<{
  readonly meta: SrcMeta;
}>;
export default function ArticleLayout({ meta, children }: ArticleLayoutProps) {
  return (
    <MainLayout>
      <PathBreadcrumbs path={meta.linkPath} />
      {children}
    </MainLayout>
  );
}
