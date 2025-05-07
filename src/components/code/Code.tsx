"use server";
import { stringTrimStart } from "@luma-dev/string-util-ts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Fragment } from "react";
import Highlighted from "./hl/Highlighted";
import PreForCode from "./hl/PreForCode";
import { renderCode } from "./render-code";
import ShowError from "../show-error";
import HackTag from "../html-hack/HackTag";

const parseClassName = (className: string) => {
  const langCode = stringTrimStart(className.trim(), "language-");
  return langCode;
};

export type CodeProps = React.PropsWithChildren<{
  readonly className: string;
}>;
export default async function Code({ children, className }: CodeProps) {
  if (typeof children === "undefined") return <ShowError error="Empty code!" />;
  if (typeof children !== "string")
    throw new Error("children must be a string");
  const langCode =
    typeof className === "string" ? parseClassName(className) : "plaintext";
  const { mdx } = await renderCode(langCode, children);

  return (
    <>
      <PreForCode>
        <Highlighted>
          <MDXRemote
            source={mdx}
            components={{
              Wrapper: Fragment,
              HackTag,
              NewLine: () => <br />,
            }}
          />
        </Highlighted>
      </PreForCode>
    </>
  );
}
