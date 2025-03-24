"use client";
import React from "react";

//const PlainCode = () => {
//  return <Code data-code-lang={lang} children={children} />;
//};

type Props = React.ComponentProps<"code">;
export default function PlainCode(props: Props) {
  return (
    <>
      <code {...props} />
      <style jsx>{`
        code {
          background: var(--color-code-bg);
          color: var(--color-code-default);
          overflow-x: auto;
          white-space: pre-wrap;
        }

        code :global(.keyword) {
          color: var(--color-keyword);
        }

        code :global(.function) {
          color: var(--color-function);
        }

        code :global(.type) {
          color: var(--color-type);
        }

        code :global(.operator) {
          color: var(--color-operator);
        }

        code :global(.punctuation) {
          color: var(--color-punctuation);
        }

        code :global(.variable) {
          color: var(--color-variable);
        }

        code :global(.constant) {
          color: var(--color-constant);
          font-weight: bold;
        }

        code :global(.variable--builtin) {
          font-weight: bold;
        }

        code :global(.string) {
          color: var(--color-string);
        }

        code :global(.punctuation.punctuation--string) {
          color: var(--color-string);
        }

        code .escape,
        code :global(.string--special) {
          color: var(--color-escape);
        }

        code :global(.comment) {
          color: var(--color-comment);
        }

        code :global(.comment--document) {
          color: var(--color-comment--document);
        }

        code :global(.property) {
          color: var(--color-property);
        }

        code :global(.attribute) {
          color: var(--color-attribute);
        }

        code :global(.constructor) {
          color: var(--color-constructor);
          font-weight: bold;
        }

        code :global(.number) {
          color: var(--color-number);
        }

        code :global(.tag) {
          color: var(--color-tag);
        }
      `}</style>
    </>
  );
}
