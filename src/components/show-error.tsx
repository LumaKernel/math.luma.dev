"use client";
import type { FC } from "react";

const ErrorText = (props: React.ComponentProps<"span">) => (
  <>
    <span {...props} />
    <style jsx>{`
      span {
        color: red;
      }
    `}</style>
  </>
);

type Props = {
  error?: unknown;
};
const ShowError: FC<Props> = ({ error }) => (
  <ErrorText>
    エラー: {String(error)}:{" "}
    {(typeof error === "object" && error !== null && "message" in error) ||
    (typeof error === "string" && error.length > 0)
      ? (error as { message: string }).message
      : "<no .message>"}
  </ErrorText>
);

export default ShowError;
