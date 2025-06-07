"use client";

import { cssColors } from "@/lib/colors";
import SlugLink from "./SlugLink";

const size = "0.19em";
const gap = "0.12em";
const thickness = "0.6px";

const StyledH3 = (props: React.ComponentProps<"h3">) => (
  <>
    <h3 {...props} />
    <style jsx>{`
      h3 {
        margin: 0;
        margin-top: 1.2em;
      }
    `}</style>
  </>
);

const circleStyle = `
  border: ${thickness} solid ${cssColors.decorationPrimary};
  width: ${size};
  height: ${size};
  margin-right: ${gap};
  border-radius: ${size};
`;

const Circle = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        ${circleStyle}
      }
    `}</style>
  </>
);

const CircleLast = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        ${circleStyle}
        margin-right: 0;
      }
    `}</style>
  </>
);

const Pole = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        width: 100%;
        border-bottom: ${thickness} solid ${cssColors.decorationPrimary};
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

export type H3Props = React.PropsWithChildren<{
  readonly lastH1Slug?: string;
  readonly lastH2Slug?: string;
  readonly slug?: string;
}>;

export default function H3({
  children,
  lastH1Slug,
  lastH2Slug,
  slug,
}: H3Props) {
  const fullSlug = [lastH1Slug, lastH2Slug, slug].filter((s) => s).join("/");
  return (
    <>
      <SlugLink Heading={StyledH3} slug={fullSlug}>
        {children}
      </SlugLink>
      <Column>
        <Circle />
        <Circle />
        <CircleLast />
        <Pole />
      </Column>
    </>
  );
}
