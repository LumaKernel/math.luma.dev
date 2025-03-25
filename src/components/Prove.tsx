"use client";

import type { FC } from "react";
import { cssColors } from "./lib/colors.ts";
import React from "react";
import Qed from "./Qed.tsx";

const thickness = "0.5px";
const size = "6px";
const halfSize = "3px";
const gap = "2px";

const Wrapper = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>
      {`
      div {
        position: relative;
        padding: 14px 8px;
        margin-top: 0.8em;
      }
    `}
    </style>
  </>
);

const LastLine = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>
      {`
      div {
        text-align: right;
      }
    `}
    </style>
  </>
);

const H4 = (props: React.ComponentProps<"h4">) => (
  <>
    <h4 {...props} />
    <style jsx>
      {`
      h4 {
        margin: 0;
      }
    `}
    </style>
  </>
);

const HorizontalLine = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>
      {`
      div {
        flex-grow: 1;
        border-bottom: ${thickness} solid ${cssColors.decorationPrimary};
        background-color: ${cssColors.decorationPrimary};
        border-radius: ${size};
      }
    `}
    </style>
  </>
);

const VerticalLine = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>
      {`
      div {
        flex-grow: 1;
        width: 0;
        border-right: ${thickness} solid ${cssColors.decorationPrimary};
        background-color: ${cssColors.decorationPrimary};
        border-radius: ${size};
      }
    `}
    </style>
  </>
);

const horizontalWrapperStyle = `
  display: flex;
  gap: ${gap};
  align-items: center;
  position: absolute;
  width: 100%;
  left: 0;
`;

const UpperLine = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>
      {`
      div {
        ${horizontalWrapperStyle}
        top: 0;
        transform: translateY(-50%);
      }
    `}
    </style>
  </>
);

const LowerLine = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>
      {`
      div {
        ${horizontalWrapperStyle}
        bottom: 0;
        transform: translateY(50%);
      }
    `}
    </style>
  </>
);

const verticalWrapperStyle = `
  display: flex;
  flex-flow: column;
  gap: ${gap};
  align-items: center;
  position: absolute;
  height: 100%;
  top: 0;
`;

const LeftLine = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>
      {`
      div {
        ${verticalWrapperStyle}
        left: 0;
        transform: translateX(-50%);
      }
    `}
    </style>
  </>
);

const RightLine = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>
      {`
      div {
        ${verticalWrapperStyle}
        right: 0;
        transform: translateX(50%);
      }
    `}
    </style>
  </>
);

const filledCircleStyle = `
  background-color: ${cssColors.decorationPrimary};
  width: ${size};
  height: ${size};
  border-radius: ${size};
`;
const FilledCircle = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>
      {`
      div {
        ${filledCircleStyle}
      }
    `}
    </style>
  </>
);

const EmptyCircle = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>
      {`
      div {
        ${filledCircleStyle}
        width: ${halfSize};
        height: ${halfSize};
        border-radius: ${size};
      }
    `}
    </style>
  </>
);

const FilledCircleLeft = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>
      {`
      div {
        ${filledCircleStyle}
        position: absolute;
        left: 0;
        transform: translateX(-50%);
      }
    `}
    </style>
  </>
);

const FilledCircleRight = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>
      {`
      div {
        position: absolute;
        right: 0;
        transform: translateX(50%);
      }
    `}
    </style>
  </>
);

interface Props {
  children: React.ReactNode;
  simple: boolean;
}
const Prove: FC<Props> = ({ children, simple }) => {
  return (
    <Wrapper>
      <UpperLine>
        <FilledCircleLeft />
        <EmptyCircle />
        <HorizontalLine />
        <FilledCircle />
        <FilledCircle />
        <EmptyCircle />
        <FilledCircleRight />
      </UpperLine>
      <LeftLine>
        <EmptyCircle />
        <VerticalLine />
        <EmptyCircle />
      </LeftLine>
      <RightLine>
        <EmptyCircle />
        <VerticalLine />
        <EmptyCircle />
      </RightLine>
      <LowerLine>
        <FilledCircleLeft />
        <EmptyCircle />
        <FilledCircle />
        <FilledCircle />
        <HorizontalLine />
        <EmptyCircle />
        <FilledCircleRight />
      </LowerLine>
      <H4>{simple ? "略証" : "証明"}</H4>
      {children}
      <LastLine>
        <Qed />
      </LastLine>
    </Wrapper>
  );
};

export default Prove;
