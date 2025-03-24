import React from "react";
import Link from "next/link";
import type { FC, MouseEventHandler } from "react";
import { useRef, useState } from "react";
import { cssColors } from "@/components/lib/colors.ts";
import { rootClass } from "@/components/root.ts";

const thickness = "0.5px";
const size = "6px";
const gap = "2px";
const hoverCircleSizePx = 40;

const backCircleR = 1;
const backCircleM = 4;

const svg1 = (isLight: boolean) => `
  <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
    <defs>
      <pattern id='bg' patternUnits='userSpaceOnUse' width='${backCircleM * 2}' height='${backCircleM * 2}'>
        <g transform="translate(${backCircleR} ${backCircleR})">
          <circle cx="0" cy="0" r="${backCircleR}" fill="${isLight ? "black" : "white"}" />
          <circle cx="${backCircleM}" cy="${backCircleM}" r="${backCircleR}" fill="${isLight ? "black" : "white"}" />
        </g>
      </pattern>
    </defs>
    <rect width='100%' height='100%' fill='url(#bg)'/>
  </svg>
`;

const svg2 = `
<svg width="${hoverCircleSizePx}px" height="${hoverCircleSizePx}px" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <radialGradient id="gradient">
      <stop offset="0%" stop-color="rgba(0,0,0,1)" />
      <stop offset="100%" stop-color="rgba(0,0,0,0)" />
    </radialGradient>
  </defs>
  <circle cx="5" cy="5" r="4" fill="url('#gradient')" />
</svg>`;

const svgToCssUrl = (svg: string): string =>
  `"data:image/svg+xml,${encodeURIComponent(svg)}"`;

const wrapperStyle = `
  font-size: 0.8em;
  position: relative;
  border: none;
  appearance: none;
  background: none;
  cursor: pointer;
  color: ${cssColors.text};
  text-decoration: none;
`;

const HorizontalLine: FC<any> = (props) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        flex-grow: 1;
        border-bottom: ${thickness} solid ${cssColors.decorationPrimary};
      }
    `}</style>
  </>
);

const UpperLine: FC<any> = (props) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        display: flex;
        align-items: center;
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
        transform: translateY(-50%);
      }
    `}</style>
  </>
);

const LowerLine: FC<any> = (props) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        display: flex;
        align-items: center;
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
        transform: translateY(50%);
      }
    `}</style>
  </>
);

const filledCircleStyle = `
  background-color: ${cssColors.decorationPrimary};
  width: ${size};
  height: ${size};
  border-radius: ${size};
`;
// const FilledCircle: FC<any> = (props) => (
//   <>
//     <div {...props} />
//     <style jsx>{`
//       div {
//         ${filledCircleStyle}
//       }
//     `}</style>
//   </>
// );

const FilledCircleLeft: FC<any> = (props) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        ${filledCircleStyle}
        position: absolute;
        left: 0;
      }
    `}</style>
  </>
);

const FilledCircleRight: FC<any> = (props) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        ${filledCircleStyle}
        position: absolute;
        right: 0;
      }
    `}</style>
  </>
);

const Background: FC<any> = (props) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        mask-image: url(${svgToCssUrl(svg2)});
        mask-repeat: no-repeat;
        transition:
          opacity 0.8s,
          mask-position 0.1s,
          mask-position 0.1s;

        background-image: url(${svgToCssUrl(svg1(true))});
      }
      @media (prefers-color-scheme: dark) {
        :global(.${rootClass}:not(.light)) div {
          background-image: url(${svgToCssUrl(svg1(false))});
        }
      }
      :global(.${rootClass}).dark div {
        background-image: url(${svgToCssUrl(svg1(false))});
      }
    `}</style>
  </>
);

const outlinedCircleStyle = `
  border: ${thickness} solid ${cssColors.decorationPrimary};
  width: ${size};
  height: ${size};
  box-sizing: border-box;
  border-radius: ${size};
  margin-left: ${gap};
  margin-right: ${gap};
`;
const OutlinedCircle: FC<any> = (props) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        ${outlinedCircleStyle}
      }
    `}</style>
  </>
);

const OutlinedCircleRightMost: FC<any> = (props) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        ${outlinedCircleStyle}
        margin-right: 0;
      }
    `}</style>
  </>
);

const OutlinedCircleLeftMost: FC<any> = (props) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        ${outlinedCircleStyle}
        margin-left: 0;
      }
    `}</style>
  </>
);

type ButtonProps = Readonly<
  React.PropsWithChildren<{
    children: React.ReactNode;
    href?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  }>
>;
const Button: FC<ButtonProps> = ({ children, onClick, href }) => {
  const rootRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [mouseInside, setMouseInside] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null
  );
  const mouseMoveHandler: MouseEventHandler<
    HTMLAnchorElement | HTMLButtonElement
  > = (ev) => {
    if (!rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    setMousePos({ x, y });
    setMouseInside(true);
  };
  const mouseLeaveHandler = () => {
    setMouseInside(false);
  };
  const inner = (
    <>
      <UpperLine>
        <FilledCircleLeft />
        <HorizontalLine />
        <OutlinedCircleLeftMost />
        <OutlinedCircle />
        <OutlinedCircle />
      </UpperLine>
      <Background
        style={{
          opacity: mouseInside ? 0.6 : 0,
          ...(mousePos && {
            maskPosition: `${mousePos.x - hoverCircleSizePx / 2}px ${mousePos.y - hoverCircleSizePx / 2}px`,
            WebkitMaskPosition: `${mousePos.x - hoverCircleSizePx / 2}px ${mousePos.y - hoverCircleSizePx / 2}px`,
          }),
        }}
      />
      <LowerLine>
        <OutlinedCircle />
        <OutlinedCircle />
        <OutlinedCircleRightMost />
        <HorizontalLine />
        <FilledCircleRight />
      </LowerLine>
      {children}
    </>
  );

  const params = {
    ref: rootRef,
    onClick,
    onMouseMove: mouseMoveHandler,
    onMouseUp: mouseLeaveHandler,
    onMouseLeave: mouseLeaveHandler,
    children: inner,
    className: "wrapper",
  } as const;
  return (
    <>
      {typeof href === "string" ? (
        <Link href={href} passHref>
          <a {...params} />
        </Link>
      ) : (
        <button {...params} />
      )}
      <style jsx>{`
        .wrapper {
          ${wrapperStyle}
        }
      `}</style>
    </>
  );
};

export default Button;
