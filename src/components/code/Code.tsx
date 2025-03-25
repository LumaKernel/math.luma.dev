import React from "react";
"use server";
import { stringTrimStart } from "@luma-dev/string-util-ts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Fragment } from "react";
import Highlighted from "./hl/Highlighted.tsx";
import PreForCode from "./hl/PreForCode.tsx";
import Span from "./hl/Span.tsx";
import { renderCode } from "./render-code.ts";

const parseClassName = (className: string) => {
  const langCode = stringTrimStart(className.trim(), "language-");
  return langCode;
};

export type CodeProps = React.PropsWithChildren<{
  readonly className: string;
}>;
export default async function Code({ children, className }: CodeProps) {
  if (typeof children !== "string") {
    throw new Error("children must be a string");
  }
  const langCode = parseClassName(className);
  const { mdx } = await renderCode(langCode, children);

  return (
    <>
      <PreForCode>
        <Highlighted>
          <MDXRemote
            source={mdx}
            components={{
              Wrapper: Fragment,
              Span,
              NewLine: () => <span>{"\n"}</span>,
            }}
          >
          </MDXRemote>
        </Highlighted>
      </PreForCode>
    </>
  );
}
