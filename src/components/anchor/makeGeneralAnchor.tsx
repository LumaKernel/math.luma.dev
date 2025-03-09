import GeneralAnchor, { GeneralAnchorProps } from "./GeneralAnchor";

export const makeGeneralAnchor = ({
  linkPath,
}: Pick<GeneralAnchorProps, "linkPath">) => {
  return (props: Omit<GeneralAnchorProps, "linkPath">) => (
    <GeneralAnchor linkPath={linkPath} {...props} />
  );
};
