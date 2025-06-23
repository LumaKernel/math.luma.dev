"use client";
import { clampInAbs100Number } from "@/lib/number";
import type { ChangeEventHandler } from "react";

const Input = (props: React.ComponentProps<"input">) => {
  return (
    <>
      <input {...props} />
      <style jsx>{`
        input {
          width: 4em;
          background-color: var(--color-bg-pri);
          color: var(--color-text);
          border: none;
          border: 1px solid var(--color-deco-pri);
        }
      `}</style>
    </>
  );
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
  const changeHandler: ChangeEventHandler<HTMLInputElement> = (ev) => {
    onInput?.(clampInAbs100Number(ev.target.value));
  };
  return (
    <>
      <div
        className={`wrapper ${emphasis ? "emphasized" : ""}`}
        style={{ borderColor: emphasis }}
      >
        <Input type="number" value={value} onChange={changeHandler} />
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
