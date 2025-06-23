"use client";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";

export type ClientLayoutProps = React.PropsWithChildren;
export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <NuqsAdapter>
      <Suspense>{children}</Suspense>
    </NuqsAdapter>
  );
}
