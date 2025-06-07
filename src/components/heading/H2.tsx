"use client";
import { cssColors } from "@/lib/colors";
import SlugLink from "./SlugLink";

const size = "0.19em";
const gap = "0.12em";
const thickness = "0.6px";

const StyledH2 = (props: React.ComponentProps<"h2">) => (
  <>
    <h2 {...props} />
    <style jsx>{`
      h2 {
        margin: 0;
        margin-top: 1.9em;
      }
    `}</style>
  </>
);

const Circle = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        border: ${thickness} solid ${cssColors.decorationPrimary};
        width: ${size};
        height: ${size};
        margin-right: ${gap};
        border-radius: ${size};
      }
    `}</style>
  </>
);

const Pole = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        border: ${thickness} solid ${cssColors.decorationPrimary};
        width: 100%;
        height: ${size};
        border-radius: ${size};
      }
    `}</style>
  </>
);

const Column = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        display: flex;
        align-items: center;
      }
    `}</style>
  </>
);

export type H2Props = React.PropsWithChildren<{
  readonly lastH1Slug?: string;
  readonly slug?: string;
}>;
export default function H2({ children, lastH1Slug, slug }: H2Props) {
  const fullSlug = [lastH1Slug, slug].filter((s) => s).join("/");
  return (
    <>
      <SlugLink Heading={StyledH2} slug={fullSlug}>
        {children}
      </SlugLink>
      <Column>
        <Circle />
        <Circle />
        <Pole />
      </Column>
    </>
  );
}
