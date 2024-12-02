import type { FC } from 'react';
import type { DisplayMode } from '@blogkit/next-config/src/processor-option/rehype-katex';

const InlineWrapper: FC<any> = (props) => (
  <>
    <span {...props} />
    <style jsx>{`
      span {
        margin-left: 0.4em;
        margin-right: 0.4em;
      }
      span :global(.base) {
        margin-top: 0.6em;
      }
    `}</style>
  </>
);

const DisplayWrapper: FC<any> = (props) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        margin-top: 2em;
      }
    `}</style>
  </>
);

type KatexProps = Readonly<
  React.PropsWithChildren<{
    mode: DisplayMode;
  }>
>;

const Katex: FC<KatexProps> = ({ mode, children }) => {
  const Tag = (params: any) =>
    ({
      inline: <InlineWrapper {...params} />,
      'block-display': <DisplayWrapper {...params} />,
      'inline-display': <InlineWrapper {...params} />,
    })[mode];

  return <Tag children={children} />;
};

export default Katex;
