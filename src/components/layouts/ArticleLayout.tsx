"use client";

import React from "react";
import MainLayout from "./MainLayout.tsx";
import PathBreadcrumbs from "../PathBreadcrumbs.tsx";
import { SrcMeta } from "@/types/article.ts";

type ArticleLayoutProps = Readonly<
  React.PropsWithChildren<{
    meta: SrcMeta;
  }>
>;
export default function ArticleLayout({ meta, children }: ArticleLayoutProps) {
  return (
    <MainLayout>
      <PathBreadcrumbs path={meta.linkPath} />
      {children}
    </MainLayout>
  );
}
