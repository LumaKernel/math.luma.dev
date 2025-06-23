"use client";
import { useTermRefViewQs } from "@/util/use-term-ref-view-qs";

const Main = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        width: 100%;
        max-width: 900px;
        margin: 0 auto;
      }
    `}</style>
  </>
);

const Wrapper = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        padding: 0 1.2rem 0 1.8rem;
      }
    `}</style>
  </>
);

type MainLayoutProps = Readonly<React.PropsWithChildren>;
export default function MainLayout({ children }: MainLayoutProps) {
  const isTermRefView = useTermRefViewQs() != null;
  return (
    <Main>
      {isTermRefView && (
        <style jsx global>{`
          body {
            overflow: hidden;
          }
        `}</style>
      )}
      <Wrapper>{children}</Wrapper>
    </Main>
  );
}
