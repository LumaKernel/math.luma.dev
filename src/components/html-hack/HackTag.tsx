"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { hackStyle } from "@/lib/inline-style-to-object";

export default async function HackTag({
  originalName: Tag,
  styleValue,
  ...props
}: any) {
  return <Tag style={hackStyle(styleValue)} {...props} />;
}
