"use server";
import { mdxIndex } from "@/contents-index.gen";
import { getPageInfo } from "@/util/preparse";
import Link from "next/link";

export type AnchorInternalProps = {
  readonly to: string;
};
export default async function AnchorInternal({ to }: AnchorInternalProps) {
  const { index, srcMeta, info } = await getPageInfo(to);
  return (
    <Link href={to} title={info.meta.title}>
      {info.meta.title}
    </Link>
  );
}
