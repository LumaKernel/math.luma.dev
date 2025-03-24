"use client";
import React from "react";
import Link from "next/link";
import { cssColors } from "@/lib/colors.ts";
import { TermDef } from "@/terms-index.gen.ts";
import { Option } from "@luma-dev/option-ts";

const thickness = "1.2px";

const Ruby = (props: React.ComponentProps<"ruby">) => (
  <>
    <ruby {...props} />
    <style jsx>
      {`
      ruby {
        padding-left: 0.2em;
        padding-right: 0.2em;
      }
    `}
    </style>
  </>
);

const PlainAnchor = (props: React.ComponentProps<"a">) => (
  <>
    <a {...props} />
    <style jsx>
      {`
      a {
        text-decoration: none;
      }
    `}
    </style>
  </>
);

const TextWrapper = (props: React.ComponentProps<"span">) => (
  <>
    <span {...props} />
    <style jsx>
      {`
      span {
        position: relative;
      }
    `}
    </style>
  </>
);

const Svg = (props: React.ComponentProps<"svg">) => (
  <>
    <svg {...props} />
    <style jsx>
      {`
      svg {
        display: inline;
        width: 100%;
        position: absolute;
        bottom: 0.06em;
        left: 0;
      }
    `}
    </style>
  </>
);

const Text = (props: React.ComponentProps<"span">) => (
  <>
    <span {...props} />
    <style jsx>
      {`
      span {
        display: inline-block;
        text-align: center;
      }
    `}
    </style>
  </>
);

const Rt = (props: React.ComponentProps<"rt">) => (
  <>
    <rt {...props} />
    <style jsx>
      {`
      rt {
        font-size: 0.8em;
        font-weight: 400;
        transform: translateY(0.2em);
      }
    `}
    </style>
  </>
);

const Line = (props: React.ComponentProps<"line">) => (
  <>
    <line {...props} />
    <style jsx>
      {`
      line {
        stroke: ${cssColors.decorationPrimary};
      }
    `}
    </style>
  </>
);

type TermClientProps = {
  readonly text: string;
  readonly reference: string;
  readonly term: TermDef;
};

export default function TermClient({
  text,
  term: { main, slug },
}: TermClientProps): React.ReactElement {
  const textInner = (() => {
    return (
      <TextWrapper title={main.text}>
        <span>{text}</span>
        <Svg width="100%" height="2px" xmlns="http://www.w3.org/2000/svg">
          <Line
            x1="0"
            y1="0"
            x2="100%"
            y2="0"
            strokeDasharray="3,2"
            strokeWidth={thickness}
          />
        </Svg>
      </TextWrapper>
    );
    // return <span title={title}>{text}</span>;
  })();
  const c = slug
    ? (
      <Link href={`/terms/${slug}`} passHref legacyBehavior>
        <PlainAnchor>{textInner}</PlainAnchor>
      </Link>
    )
    : textInner;
  if (typeof main.ruby === "string") {
    return (
      <>
        <Ruby>
          <Text style={{ minWidth: `${main.ruby.length * 0.4}em` }}>{c}</Text>
          <rp>(</rp>
          <Rt>{main.ruby}</Rt>
          <rp>)</rp>
        </Ruby>
        {Option.fromNullish(main.jaRuby)
          .map((e) => <>（{e}）</>)
          .toNullable()}
      </>
    );
  }
  return c;
}
