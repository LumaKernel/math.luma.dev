import Link from "next/link";
import type { FC } from "react";
import React from "react";
import { cssColors } from "@blogkit/blog-components/src/lib/colors";

const Flex: FC<any> = (props) => (
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

const A: FC<any> = (props) => (
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

type Props = {
  path: string;
};

export default function PathBreadcrumbs({ path }: Props) {
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
      <Link href="/" passHref>
        <A>math.luma.dev</A>
      </Link>
      {parts.map((p, i) => (
        <React.Fragment key={i}>
          <span>/</span>
          <Link href={p.href} passHref>
            <A>{p.name}</A>
          </Link>
        </React.Fragment>
      ))}
    </Flex>
  );
}
