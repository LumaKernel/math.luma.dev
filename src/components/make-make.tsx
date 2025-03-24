import React from "react";
export const makeMake =
  (Comp: React.ComponentType<any>) => (currentLinkPath: string) => {
    return (props: any) => (
      <Comp currentLinkPath={currentLinkPath} {...(props as any)} />
    );
  };
