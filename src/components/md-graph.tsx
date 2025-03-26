import React from "react";
import type { FC } from "react";
import ShowError from "./show-error.tsx";
import RememberRowColumnSvg from "@/contents/linear-algebra/basics/RememberRowColumnSvg.tsx";
import IsRowEchMat from "@/contents/linear-algebra/basics/IsRowEchMat.tsx";
import IsRedRowEchMat from "@/contents/linear-algebra/basics/IsRedRowEchMat.tsx";
import GaussElim from "@/contents/linear-algebra/basics/GaussElim.tsx";

const graphs: Record<string, FC<any> | undefined> = {
  "row-column": RememberRowColumnSvg,
  "is-row-ech-mat": IsRowEchMat,
  "is-red-row-ech-mat": IsRedRowEchMat,
  "gauss-elim": GaussElim,
};

type Props = {
  w: string;
};

const MdGraph: FC<Props> = ({ w, ...rest }) => {
  const Def = graphs[w];
  if (Def == null) {
    return <ShowError error={`Graph name "${w}" not found.`} />;
  }
  return <Def {...rest} />;
};

export default MdGraph;
