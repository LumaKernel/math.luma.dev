"use client";
import Link from "next/link";
import { cssColors } from "@/lib/colors";
import { useRef, useState, useEffect } from "react";

export type TermButtonProps = {
  readonly linkPath: string;
  readonly targetTermRef: string;
  readonly targetTermRefIndex: number;
  readonly height: string;
};
export default function TermButton({
  linkPath,
  targetTermRef,
  targetTermRefIndex,
  height,
}: TermButtonProps) {
  return (
    <>
      <span className="container">
        <Link href={`${linkPath}#term.${targetTermRef}.${targetTermRefIndex}`}>
          <iframe
            src={`${linkPath}?termRefView=true&termRefView.ref=${targetTermRef}&termRefView.index=${targetTermRefIndex}#term.${targetTermRef}.${targetTermRefIndex}`}
            width="100%"
            height={height}
          />
        </Link>
      </span>
      <style jsx>{`
        .container {
          height: ${height};
          display: block;
          position: relative;
        }
        .container > :global(a) {
          display: block;
          position: relative;
          border: 1px solid ${cssColors.text};
          overflow: hidden;
          mask-image: radial-gradient(
            ellipse 100% 100% at center,
            black 70%,
            transparent 100%
          );
          mask-position:
            0 0,
            center center;
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
