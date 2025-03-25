"use client";
import React from "react";
import { DisplayMode } from "./type.ts";

const InlineWrapper = (props: React.ComponentProps<"span">) => (
  <>
    <span {...props} />
    <style jsx>
      {`
      span {
        margin-left: 0.4em;
        margin-right: 0.4em;
      }
      span :global(.base) {
        margin-top: 0.6em;
      }
    `}
    </style>
  </>
);

const DisplayWrapper = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>
      {`
      div {
        margin-top: 2em;
      }
    `}
    </style>
  </>
);

export type LumaKatexClientProps = React.PropsWithChildren<{
  readonly displayMode: DisplayMode;
}>;

export default function LumaKatexClient({
  displayMode,
  children,
}: LumaKatexClientProps) {
  switch (displayMode) {
    case "inline":
      return <InlineWrapper>{children}</InlineWrapper>;
    case "block-display":
      return <DisplayWrapper>{children}</DisplayWrapper>;
    case "inline-display":
      return <InlineWrapper>{children}</InlineWrapper>;
    default: {
      throw new Error(`Unknown display mode: ${displayMode satisfies never}`);
    }
  }
}
