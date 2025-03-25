"use client";
import React from "react";

const Main = (props: React.ComponentProps<"main">) => (
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

type MainLayoutProps = Readonly<React.PropsWithChildren>;
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Main>
      <Wrapper>{children}</Wrapper>
    </Main>
  );
}
