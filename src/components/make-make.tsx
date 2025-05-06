/* eslint-disable @typescript-eslint/no-explicit-any, react/display-name -- Hack */
export const makeMake =
  (Comp: React.ComponentType<any>) => (currentLinkPath: string) => {
    return (props: any) => (
      <Comp currentLinkPath={currentLinkPath} {...props} />
    );
  };
