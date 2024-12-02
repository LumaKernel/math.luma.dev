"use client";

import React from "react";
import MainLayout from "./MainLayout";
import PathBreadcrumbs from "../PathBreadcrumbs";
import { ArticleMetadata } from "@/types/article";

type ArticleLayoutProps = Readonly<
  React.PropsWithChildren<{
    meta: ArticleMetadata;
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
