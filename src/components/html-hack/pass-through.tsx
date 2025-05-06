"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { hackStyle } from "@/lib/inline-style-to-object";

const createPassThrough = (Tag: string) => {
  function PassThrough({ children, styleValue, ...props }: any) {
    return (
      <Tag style={hackStyle(styleValue)} {...props}>
        {children}
      </Tag>
    );
  }
  return PassThrough;
};

export async function PassThroughSpan(props: any) {
  return createPassThrough("span")(props);
}

export async function PassThroughSvg(props: any) {
  return createPassThrough("svg")(props);
}
