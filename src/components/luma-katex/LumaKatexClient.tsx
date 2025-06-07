"use client";

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
  readonly block: boolean;
}>;

export default function LumaKatexClient({
  block,
  children,
}: LumaKatexClientProps) {
  if (block) {
    return <DisplayWrapper>{children}</DisplayWrapper>;
  } else {
    return <InlineWrapper>{children}</InlineWrapper>;
  }
}
