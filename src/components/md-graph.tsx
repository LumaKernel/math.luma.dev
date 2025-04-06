import type { FC } from "react";
import ShowError from "./show-error";
import RememberRowColumnSvg from "./graphs/linear-algebra/remember-row-column-svg";
import IsRowEchMat from "./graphs/linear-algebra/is-row-ech-mat";
import IsRedRowEchMat from "./graphs/linear-algebra/is-red-row-ech-mat";
import GaussElim from "./graphs/linear-algebra/gauss-elim";

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
