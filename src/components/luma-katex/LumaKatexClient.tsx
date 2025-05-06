"use client";

import type { KatexShowMode } from "@luma-dev/my-unified/katex-ex";

const InlineWrapper = (props: React.ComponentProps<"span">) => (
  <>
    <span {...props} />
    <style jsx>{`
      span {
        margin-left: 0.4em;
        margin-right: 0.4em;
      }
      span :global(.base) {
        margin-top: 0.6em;
      }
    `}</style>
  </>
);

const DisplayWrapper = (props: React.ComponentProps<"span">) => (
  <>
    <span {...props} />
    <style jsx>{`
      span {
        display: block;
        margin-top: 2em;
      }
    `}</style>
  </>
);

export type LumaKatexClientProps = React.PropsWithChildren<{
  readonly displayMode: KatexShowMode;
}>;

export default function LumaKatexClient({
  displayMode,
  children,
}: LumaKatexClientProps) {
  switch (displayMode) {
    case "inline":
      return <InlineWrapper>{children}</InlineWrapper>;
    case "inline-block":
      return <InlineWrapper>{children}</InlineWrapper>;
    case "display":
      return <DisplayWrapper>{children}</DisplayWrapper>;
    default: {
      throw new Error(
        `Unknown display mode: ${displayMode satisfies never as 0}`
      );
    }
  }
}
