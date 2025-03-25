"use client";
import React from "react";

import { cssColors } from "../lib/colors.ts";
import SlugLink from "./SlugLink.tsx";

const size = "0.24em";
const gap = "0.2em";

const StyledH1 = (props: React.ComponentProps<"h1">) => (
  <>
    <h1 {...props} />
    <style jsx>
      {`
      h1 {
        margin: 0;
        margin-top: 0.7em;
      }
    `}
    </style>
  </>
);

const Circle = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>
      {`
      div {
        background-color: ${cssColors.decorationPrimary};
        width: ${size};
        height: ${size};
        border-radius: ${size};
      }
    `}
    </style>
  </>
);

const Pole = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>
      {`
      div {
        background-color: ${cssColors.decorationPrimary};
        width: 100%;
        height: ${size};
        border-radius: ${size};
      }
    `}
    </style>
  </>
);

const Column = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>
      {`
      div {
        display: flex;
        gap: ${gap};
        align-items: center;
      }
    `}
    </style>
  </>
);

export type H1Props = Readonly<
  React.PropsWithChildren<{
    slug?: string;
  }>
>;
export default function H1({ children, slug }: H1Props) {
  return (
    <>
      <SlugLink Heading={StyledH1} slug={slug}>
        {children}
      </SlugLink>
      <Column>
        <Circle />
        <Pole />
      </Column>
    </>
  );
}
