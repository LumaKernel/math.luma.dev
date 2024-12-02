"use server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { renderCode } from "./render-code";
import PreForCode from "./hl/PreForCode";
import Highlighted from "./hl/Highlighted";
import Span from "./hl/Span";
import { processCodeHtml } from "@luma-dev/math-luma-dev-dirty-util";

export default async function Code({
  children,
  ...ps
}: React.PropsWithChildren) {
  if (typeof children !== "string")
    throw new Error("children must be a string");

  const { html } = await renderCode("js", children);
  const mdxSource = await processCodeHtml(html);

  return (
    <>
      <PreForCode>
        <Highlighted>
          <MDXRemote
            source={mdxSource}
            components={{
              Wrapper: "span",
              Span,
              NewLine: () => <span>{"\n"}</span>,
            }}
          ></MDXRemote>
        </Highlighted>
      </PreForCode>
      <div>
        <code>{JSON.stringify(ps)}</code>
      </div>
    </>
  );
}
