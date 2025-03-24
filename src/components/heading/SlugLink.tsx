"use client";
import React from "react";

import { HiLink } from "react-icons/hi";

const MouseLayer = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        position: absolute;
        left: -1.1em;
        font-size: 1rem;
        top: 55%;
        transform: translateY(-50%);
        width: 1.2rem;
        height: 2.8em;
      }
    `}</style>
  </>
);

export type SlugLinkProps = Readonly<
  React.PropsWithChildren<{
    Heading: React.FC<{
      className: string;
      id?: string;
      children: React.ReactNode;
    }>;
    slug?: string;
  }>
>;

export default function SlugLink({ Heading, slug, children }: SlugLinkProps) {
  return (
    <>
      <Heading className="heading" id={slug}>
        <MouseLayer />
        {slug ? (
          <a href={`#${slug}`} aria-hidden="true" tabIndex={-1}>
            <HiLink />
          </a>
        ) : (
          <></>
        )}
        {children}
      </Heading>
      <style jsx>{`
        a {
          position: absolute;
          left: -1.16em;
          font-size: 1.1rem;
          top: 60%;
          transform: translateY(-50%);
        }

        .heading {
          position: relative;
        }

        .heading a {
          display: none;
        }
        .heading:hover a {
          display: inline-block;
        }
      `}</style>
    </>
  );
}
