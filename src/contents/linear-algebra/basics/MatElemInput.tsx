"use client";
import React from "react";
import { clampInAbs100Number } from "@/components/lib/number.ts";
import type { FormEvent } from "react";
import { cssColors } from "@/components/lib/colors.ts";

const Input = (props: React.ComponentProps<"input">) => {
  <>
    <input {...props} />
    <style jsx>{`
      input {
        width: 4em;
        background-color: ${cssColors.bgPrimary};
        color: ${cssColors.text};
        border: none;
        border: 1px solid ${cssColors.decorationPrimary};
      }
    `}</style>
  </>;
};

const emphasizedStyle = `
  border-width: 5px;
  border-style: solid;
`;

export type MatElemInputProps = {
  readonly value: number;
  readonly emphasis?: string;
  readonly onInput?: (newValue: number) => void;
};
export default function MatElemInput({
  value,
  emphasis,
  onInput,
}: MatElemInputProps) {
  const inputHandler = (ev: FormEvent<HTMLInputElement>) => {
    const { value } = ev.target as any;
    onInput?.(clampInAbs100Number(value));
  };
  return (
    <>
      <div
        className={`wrapper ${emphasis ? "emphasized" : ""}`}
        style={{ borderColor: emphasis }}
      >
        <Input
          type="number"
          value={value}
          onInput={(ev: FormEvent<HTMLInputElement>) => inputHandler(ev)}
        />
      </div>
      <style jsx>{`
        .wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .wrapper.emphasized {
          ${emphasizedStyle}
        }
      `}</style>
    </>
  );
}
