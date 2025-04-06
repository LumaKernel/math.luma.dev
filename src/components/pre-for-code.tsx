import type { FC } from "react";

const Pre = (props: React.ComponentProps<"pre">) => (
  <>
    <pre {...props} />
    <style jsx>{`
      pre :global(code) {
        padding: 0.4em;
        display: block;
      }
    `}</style>
  </>
);

type Props = {
  children: React.ReactNode;
};

const PreForCode: FC<Props> = ({ children }) => {
  return <Pre>{children}</Pre>;
};

export default PreForCode;
