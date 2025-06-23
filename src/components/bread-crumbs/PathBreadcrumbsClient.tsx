"use client";
import Link from "next/link";
import React from "react";
import type { PathBreadcrumbsParts } from "./PathBreadcrumbs";

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

export type PathBreadcrumbsClientProps = {
  readonly parts: PathBreadcrumbsParts;
};
export default function PathBreadcrumbsClient({
  parts,
}: PathBreadcrumbsClientProps) {
  return (
    <Flex>
      {parts.map(({ linkPath, name, exists }, i) => (
        <React.Fragment key={i}>
          <span>/</span>
          {exists ? (
            <>
              <Link href={"/" + linkPath}>{name}</Link>
              <style jsx>{`
                a {
                  color: var(--color-text);
                }
              `}</style>
            </>
          ) : (
            <>
              <span>{name}</span>
              <style jsx>{`
                span {
                  color: var(--color-text);
                }
              `}</style>
            </>
          )}
        </React.Fragment>
      ))}
    </Flex>
  );
}
