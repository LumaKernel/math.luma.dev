import Link from 'next/link';
import type { FC } from 'react';
import { cssColors } from './lib/colors';

const thickness = '1.2px';

const Ruby: FC<any> = (props) => (
  <>
    <ruby {...props} />
    <style jsx>{`
      ruby {
        padding-left: 0.2em;
        padding-right: 0.2em;
      }
    `}</style>
  </>
);

const PlainAnchor: FC<any> = (props) => (
  <>
    <a {...props} />
    <style jsx>{`
      a {
        text-decoration: none;
      }
    `}</style>
  </>
);

const TextWrapper: FC<any> = (props) => (
  <>
    <span {...props} />
    <style jsx>{`
      span {
        position: relative;
      }
    `}</style>
  </>
);

const Svg: FC<any> = (props) => (
  <>
    <svg {...props} />
    <style jsx>{`
      svg {
        display: inline;
        width: 100%;
        position: absolute;
        bottom: 0.06em;
        left: 0;
      }
    `}</style>
  </>
);

const Text: FC<any> = (props) => (
  <>
    <span {...props} />
    <style jsx>{`
      span {
        display: inline-block;
        text-align: center;
      }
    `}</style>
  </>
);

const Rt: FC<any> = (props) => (
  <>
    <rt {...props} />
    <style jsx>{`
      rt {
        font-size: 0.8em;
        font-weight: 400;
        transform: translateY(0.2em);
      }
    `}</style>
  </>
);

const Line: FC<any> = (props) => (
  <>
    <line {...props} />
    <style jsx>{`
      line {
        stroke: ${cssColors.decorationPrimary};
      }
    `}</style>
  </>
);

type TermProps = Readonly<
  React.PropsWithChildren<{
    ruby?: string;
    jaRuby?: string;
    slug?: string;
    title?: string;
  }>
>;

const Term: FC<TermProps> = ({ ruby, jaRuby, slug, title, children }) => {
  const textInner = (() => {
    if (slug)
      return (
        <TextWrapper title={title}>
          <span>{children}</span>
          <Svg width="100%" height="2px" xmlns="http://www.w3.org/2000/svg">
            <Line x1="0" y1="0" x2="100%" y2="0" strokeDasharray="3,2" strokeWidth={thickness} />
          </Svg>
        </TextWrapper>
      );
    return <span title={title}>{children}</span>;
  })();
  const text = slug ? (
    <Link href={`/terms/${slug}`} passHref>
      <PlainAnchor children={textInner} />
    </Link>
  ) : (
    textInner
  );
  if (typeof ruby === 'string') {
    return (
      <>
        <Ruby>
          <Text style={{ minWidth: `${ruby.length * 0.4}em` }}>{text}</Text>
          <rp>(</rp>
          <Rt>{ruby}</Rt>
          <rp>)</rp>
        </Ruby>
        {jaRuby ? <>（{jaRuby}）</> : <></>}
      </>
    );
  }
  return text;
};

export default Term;
