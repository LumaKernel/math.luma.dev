"use client";
import { cssFonts } from "@/components/lib/fonts";

const Indicator = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        border-radius: 1.1rem;
        width: 1.1rem;
        height: 1.1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: ${cssFonts.monospace};
      }
    `}</style>
  </>
);

export type MatIndexIndicatorProps = {
  readonly vertical: boolean;
  readonly fgColor: string;
  readonly bgColor: string;
  readonly children: React.ReactNode;
};
export default function MatIndexIndicator({
  fgColor,
  bgColor,
  children,
}: MatIndexIndicatorProps) {
  return (
    <Indicator
      style={{
        backgroundColor: bgColor,
        color: fgColor,
      }}
      children={children}
    />
  );
}
