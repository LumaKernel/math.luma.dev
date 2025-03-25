import type { FlippedProps } from "flip-toolkit/lib/types";
import type { FC } from "react";
import React from "react";
import { Flipped } from "react-flip-toolkit";

interface Props extends FlippedProps {
  flipIdPrefix?: string | null;
}
const PrefixedFlipped: FC<Props> = (props) => {
  const { flipIdPrefix, flipId, inverseFlipId, ...rest } = props;
  if (flipIdPrefix) {
    return (
      <Flipped
        flipId={`${flipIdPrefix}${flipId}`}
        inverseFlipId={inverseFlipId
          ? `${flipIdPrefix}${inverseFlipId}`
          : inverseFlipId}
        {...rest}
      />
    );
  }
  return <React.Fragment {...(rest as any)} />;
};

export const usePrefixedFlipped =
  (flipIdPrefix?: string | null) => (props: FlippedProps) =>
    PrefixedFlipped({ flipIdPrefix, ...props });

export default PrefixedFlipped;
