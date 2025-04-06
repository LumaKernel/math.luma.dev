import type { FC } from "react";
import Button from "./button";
import type { ParsedPage } from "./types";

const Wrapper = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        min-width: 260px;
        padding: 14px 8px;
      }
    `}</style>
  </>
);

const LinkPath = (props: React.ComponentProps<"div">) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        font-size: 0.8em;
        color: grey;
      }
    `}</style>
  </>
);

interface Props {
  num: number;
  navData: ParsedPage;
}
const SeriesNavButton: FC<Props> = ({ num, navData }) => {
  return (
    <Button href={`/${navData.loc.linkPath}`}>
      <Wrapper>
        <div>
          {num}章 {navData.pageConfig?.title}
        </div>
        <LinkPath>{navData.loc.linkPath}</LinkPath>
      </Wrapper>
    </Button>
  );
};

export default SeriesNavButton;
