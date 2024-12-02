import type { FC } from 'react';
import { cssFonts } from '@blogkit/blog-components/src/lib/fonts';

const Indicator: FC<any> = (props) => (
  <>
    <div {...props} />
    <style jsx>{`
      div {
        border-radius: 1.1rem;
        width: 1.1rem;
        height: 1.1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: ${cssFonts.monospace};
      }
    `}</style>
  </>
);

interface Props {
  vertical: boolean;
  fgColor: string;
  bgColor: string;
  children: React.ReactNode;
}
const MatIndexIndicator: FC<Props> = ({ fgColor, bgColor, children }) => {
  return (
    <Indicator
      style={{
        backgroundColor: bgColor,
        color: fgColor,
      }}
      children={children}
    />
  );
};

export default MatIndexIndicator;
