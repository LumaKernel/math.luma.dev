import React from "react";
import type { FC } from "react";

const Main = (props: React.ComponentProps<"div">) => (
  <>
    <main {...props} />
    <style jsx>
      {`
      main {
        width: 100%;
        max-width: 900px;
        margin: 0 auto;
      }
    `}
    </style>
  </>
);

const Wrapper = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>
      {`
      div {
        padding: 0 1.2rem 0 1.8rem;
      }
    `}
    </style>
  </>
);

interface Props {
  children?: React.ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <Main>
      <Wrapper>{children}</Wrapper>
    </Main>
  );
};

export default MainLayout;
