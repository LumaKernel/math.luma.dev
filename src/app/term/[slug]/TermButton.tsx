"use client";
import Link from "next/link";
import { useState } from "react";

export type TermButtonProps = {
  readonly linkPath: string;
  readonly targetTermRef: string;
  readonly targetTermRefCategory: string;
  readonly targetTermRefIndex: number;
  readonly height: string;
};
export default function TermButton({
  linkPath,
  targetTermRef,
  targetTermRefCategory,
  targetTermRefIndex,
  height,
}: TermButtonProps) {
  const gradSizeX = "1rem";
  const gradSizeY = "4rem";
  const [isLoading, setIsLoading] = useState(true);

  const query = `?termRefView=true&termRefView.ref=${targetTermRef}&termRefView.category=${targetTermRefCategory}&termRefView.index=${targetTermRefIndex}`;
  const hash = `#term.${targetTermRef}.${targetTermRefCategory}.${targetTermRefIndex}`;

  return (
    <>
      <span className="container">
        {isLoading && (
          <span className="skeleton">
            <span className="skeleton-shimmer" />
          </span>
        )}
        <span className="mask1" style={{ opacity: isLoading ? 0 : 1 }}>
          <span className="mask2">
            <Link href={`${linkPath}${hash}`}>
              <iframe
                src={`${linkPath}${query}${hash}`}
                width="100%"
                height={height}
                onLoad={() => setIsLoading(false)}
              />
            </Link>
          </span>
        </span>
        <span className="deco-1" />
        <span className="deco-2" />
      </span>
      <style jsx>{`
        .skeleton {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--color-skeleton-pri);
          border-radius: 0.4rem;
          overflow: hidden;
        }
        .skeleton-shimmer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgb(255 255 255 / 0.1),
            transparent
          );
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .mask1 {
          transition: opacity 0.3s ease-in-out;
        }
        .deco-1 {
          width: calc(100% + 10px);
          height: calc(100% + 10px);
          box-sizing: border-box;
          position: absolute;
          top: -5px;
          left: -5px;
          pointer-events: none;
          border-width: 1.5px;
          border-style: solid;
          border-color: rgba(var(--color-deco-pri), 0.8);
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
          border-width: 1.5px;
          border-style: solid;
          border-color: rgba(var(--color-deco-pri), 0.8);
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
            #000 ${gradSizeY},
            #000,
            #000 calc(100% - ${gradSizeY}),
            #0000
          );
        }
        .mask2 {
          mask-image: linear-gradient(
            90deg,
            #0000,
            #000 ${gradSizeX},
            #000,
            #000 calc(100% - ${gradSizeX}),
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
