import React from "react";
import type { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const MdTable: FC<Props> = ({ children }) => {
  return <table cellSpacing="0" children={children} />;
};

export default MdTable;
