import React from "react";
import type { FC } from "react";

const ErrorText = (props: React.ComponentProps<"div">) => (
  <>
    <span {...props} />
    <style jsx>
      {`
      span {
        color: red;
      }
    `}
    </style>
  </>
);

type Props = {
  error?: unknown;
};
const ShowError: FC<Props> = ({ error }) => (
  <ErrorText>
    エラー: {String(error)}: {(error as any)?.message}
  </ErrorText>
);

export default ShowError;
