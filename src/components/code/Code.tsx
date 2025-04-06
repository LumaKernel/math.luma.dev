"use server";
import { stringTrimStart } from "@luma-dev/string-util-ts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Fragment } from "react";
import Highlighted from "./hl/Highlighted";
import PreForCode from "./hl/PreForCode";
import Span from "./hl/Span";
import { renderCode } from "./render-code";

const parseClassName = (className: string) => {
  const langCode = stringTrimStart(className.trim(), "language-");
  return langCode;
};

export type CodeProps = React.PropsWithChildren<{
  readonly className: string;
}>;
export default async function Code({ children, className }: CodeProps) {
  if (typeof children !== "string")
    throw new Error("children must be a string");
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
              NewLine: () => <br />,
            }}
          />
        </Highlighted>
      </PreForCode>
    </>
  );
}
