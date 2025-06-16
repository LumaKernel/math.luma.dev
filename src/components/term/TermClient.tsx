"use client";
import Link from "next/link";
import { cssColors } from "@/lib/colors";
import type { TermDef } from "@/terms-index.gen";
import { Option } from "@luma-dev/option-ts";
import { pagefindAttrs } from "@/util/pagefind";
import type { TermContainer } from "@luma-dev/my-unified/rehype-proc-term";
import {
  parseAsBoolean,
  parseAsIndex,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";
import { useEffect, useRef } from "react";

const thickness = "1.2px";

const Ruby = (props: React.ComponentProps<"ruby">) => (
  <>
    <ruby {...props} />
    <style jsx>{`
      ruby {
        padding-left: 0.2em;
        padding-right: 0.2em;
      }
    `}</style>
  </>
);

const PlainAnchor = (props: React.ComponentProps<typeof Link>) => (
  <>
    <Link
      {...props}
      style={{
        textDecoration: "none",
        ...props.style,
      }}
    />
  </>
);

const TextWrapper = (props: React.ComponentProps<"span">) => (
  <>
    <span {...props} />
    <style jsx>{`
      span {
        position: relative;
      }
    `}</style>
  </>
);

const Svg = (props: React.ComponentProps<"svg">) => (
  <>
    <svg {...props} />
    <style jsx>{`
      svg {
        display: inline;
        width: 100%;
        position: absolute;
        bottom: 0.06em;
        left: 0;
      }
    `}</style>
  </>
);

const Text = (props: React.ComponentProps<"span">) => (
  <>
    <span {...props} />
    <style jsx>{`
      span {
        display: inline-block;
        text-align: center;
      }
    `}</style>
  </>
);

const Rt = (props: React.ComponentProps<"rt">) => (
  <>
    <rt {...props} />
    <style jsx>{`
      rt {
        font-size: 0.8em;
        font-weight: 400;
        transform: translateY(0.2em);
      }
    `}</style>
  </>
);

const Line = (props: React.ComponentProps<"line">) => (
  <>
    <line {...props} />
    <style jsx>{`
      line {
        stroke: ${cssColors.decorationPrimary};
      }
    `}</style>
  </>
);

type TermClientProps = {
  readonly text: string;
  readonly reference: string;
  readonly term: TermDef;
  readonly showRuby: boolean;
  readonly termContainer: TermContainer | null;
  readonly refIndex: number;
};

export default function TermClient({
  text,
  term: { main, slug },
  showRuby,
  termContainer,
  refIndex,
}: TermClientProps): React.ReactElement {
  const [termRefView] = useQueryState(
    "termRefView",
    parseAsBoolean.withDefault(false),
  );
  // http://localhost:4030/statistics/elementary?termRefView=true&termRefView.ref=correlation-coefficient&termRefView.index=0#term.correlation-coefficient.0
  const [termRefRef] = useQueryState("termRefView.ref", parseAsString);
  const [termRefIndex] = useQueryState("termRefView.index", parseAsInteger);

  const isHighlighted =
    termRefView && termRefRef === slug && termRefIndex === refIndex;

  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // scroll to it
    if (isHighlighted && ref.current) {
      ref.current.scrollIntoView({
        behavior: "instant",
        block: "center",
      });
    }
  }, [isHighlighted]);

  const textInner = (() => {
    return (
      <TextWrapper title={main.text}>
        <span ref={ref}>{text}</span>
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
        <style jsx>{`
          span {
            color: ${isHighlighted && cssColors.em3};
          }
        `}</style>
      </TextWrapper>
    );
    // return <span title={title}>{text}</span>;
  })();
  const c = slug ? (
    <PlainAnchor href={`/term/${slug}`}>{textInner}</PlainAnchor>
  ) : (
    textInner
  );
  const final = (() => {
    if (showRuby && typeof main.ruby === "string") {
      return (
        <>
          <Ruby>
            <Text style={{ minWidth: `${main.ruby.length * 0.4}em` }}>{c}</Text>
            <rp {...pagefindAttrs.ignoreAll}>(</rp>
            <Rt {...pagefindAttrs.ignoreAll}>{main.ruby}</Rt>
            <rp {...pagefindAttrs.ignoreAll}>)</rp>
          </Ruby>
          {Option.fromNullish(main.jaRuby)
            .map((e) => (
              <>
                <span {...pagefindAttrs.ignoreAll}>（{e}）</span>
              </>
            ))
            .unwrapOrNull()}
        </>
      );
    }
    return c;
  })();

  return (
    <span
      data-pagefind-weight="12"
      data-pagefind-meta="termSlug[data-term-slug]"
      data-term-slug={slug}
      data-term-container={termContainer}
      data-term-ref-index={refIndex}
      id={`term.${slug}.${refIndex}`}
    >
      {final}
    </span>
  );
}
