/* eslint-disable @typescript-eslint/no-explicit-any */

import { hackStyle } from "@/lib/inline-style-to-object";

export const createPassThrough = (Tag: string) => {
  function PassThrough({ children, styleValue, ...props }: any) {
    return (
      <Tag style={hackStyle(styleValue)} {...props}>
        {children}
      </Tag>
    );
  }
  return PassThrough;
};
