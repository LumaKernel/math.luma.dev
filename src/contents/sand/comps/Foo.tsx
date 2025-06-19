"use client";
import Link from "next/link";
import { cssColors } from "@/lib/colors";
import { useRef, useState, useEffect } from "react";

export type FooProps = {
  readonly linkPath: string;
  readonly targetTermRef: string;
  readonly targetTermRefIndex: number;
  readonly height: string | number;
};
export default function Foo({
  linkPath,
  targetTermRef,
  targetTermRefIndex,
  height,
}: FooProps) {
  return (
    <>
      <span>
        <Link href={`${linkPath}#term.${targetTermRef}.${targetTermRefIndex}`}>
          <iframe
            src={`${linkPath}?termRefView=true&termRefView.ref=${targetTermRef}&termRefView.index=${targetTermRefIndex}#term.${targetTermRef}.${targetTermRefIndex}`}
            width="100%"
            height={height}
          />
        </Link>
      </span>
      <style jsx>{`
        span > :global(a) {
          display: block;
          border: 1px solid ${cssColors.text};
        }
        iframe {
          display: block;
          border: none;
          pointer-events: none;
        }
      `}</style>
    </>
  );
}
