"use client";
import Link from "next/link";
import React from "react";
import { cssColors } from "./lib/colors";

const Flex = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        display: flex;
        gap: 0.3em;
      }
    `}</style>
  </>
);

const A = (props: React.ComponentProps<"a">) => (
  <>
    <a {...props} />
    <style jsx>{`
      a {
        color: ${cssColors.text};
      }
    `}</style>
  </>
);

interface Part {
  href: string;
  name: string;
}

type PathBreadcrumbsProps = Readonly<{
  path: string;
}>;
export default function PathBreadcrumbs({ path }: PathBreadcrumbsProps) {
  const parts = path
    .split("/")
    .reverse()
    .reduce(
      (arr, p) => [
        ...arr.map((e) => ({
          ...e,
          href: `/${p}${e.href}`,
        })),
        {
          href: `/${p}`,
          name: p,
        },
      ],
      [] as Part[]
    )
    .reverse();

  return (
    <Flex>
      <Link href="/" passHref legacyBehavior>
        <A>math.luma.dev</A>
      </Link>
      {parts.map((p, i) => (
        <React.Fragment key={i}>
          <span>/</span>
          <Link href={p.href} passHref legacyBehavior>
            <A>{p.name}</A>
          </Link>
        </React.Fragment>
      ))}
    </Flex>
  );
}
