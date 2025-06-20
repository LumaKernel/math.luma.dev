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
  const gradSize = "4rem";
  return (
    <>
      <span className="container">
        <span className="mask1">
          <span className="mask2">
            <Link
              href={`${linkPath}#term.${targetTermRef}.${targetTermRefIndex}`}
            >
              <iframe
                src={`${linkPath}?termRefView=true&termRefView.ref=${targetTermRef}&termRefView.index=${targetTermRefIndex}#term.${targetTermRef}.${targetTermRefIndex}`}
                width="100%"
                height={height}
              />
            </Link>
            <span className="foo2" />
          </span>
        </span>
        <span className="deco-1" />
        <span className="deco-2" />
      </span>
      <style jsx>{`
        .deco-1 {
          width: calc(100% + 10px);
          height: calc(100% + 10px);
          box-sizing: border-box;
          position: absolute;
          top: -5px;
          left: -5px;
          pointer-events: none;
          border: 1.5px solid #fff8;
          border-radius: 0.4rem;
          margin: -5px;
          opacity: 0;
          transition: all 0.2s ease-in-out;
          .container:hover & {
            margin: 0;
            opacity: 1;
          }
        }
        .deco-2 {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          pointer-events: none;
          border: 1.5px solid #fff8;
          border-radius: 0.4rem;
          transition: all 0.2s ease-in-out;
          box-sizing: border-box;
          margin: 0;
          .container:hover & {
            opacity: 1;
            border-width: 4.4px;
          }
        }
        .mask1 {
          mask-image: linear-gradient(
            0deg,
            #0000,
            #000 ${gradSize},
            #000,
            #000 calc(100% - ${gradSize}),
            #0000
          );
        }
        .mask2 {
          mask-image: linear-gradient(
            90deg,
            #0000,
            #000 ${gradSize},
            #000,
            #000 calc(100% - ${gradSize}),
            #0000
          );
        }
        .foo {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background:
            linear-gradient(
              0deg,
              #0000,
              #fff 20px,
              #fff,
              #fff calc(100% - 20px),
              #0000
            ),
            linear-gradient(
              90deg,
              #0000,
              #fff 20px,
              #fff,
              #fff calc(100% - 20px),
              #0000
            );
        }
        .container {
          height: ${height};
          display: block;
          position: relative;
        }
        .container > :global(a) {
          display: block;
          position: relative;
          overflow: hidden;
          mask-image: radial-gradient(
            ellipse 100% 100% at center,
            #fff,
            #fff 0.9,
            #0000
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
// background:
//   linear-gradient(
//     0deg,
//     #0000,
//     #fff 20px,
//     #fff,
//     #fff calc(100% - 20px),
//     #0000
//   ),
//   linear-gradient(
//     90deg,
//     #0000,
//     #fff 20px,
//     #fff,
//     #fff calc(100% - 20px),
//     #0000
//   );
