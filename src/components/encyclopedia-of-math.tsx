import Link from 'next/link';
import type { FC } from 'react';
import { cssColors } from '@/lib/colors';

const Badge: FC<any> = (props) => (
  <>
    <span {...props} />
    <style jsx>{`
      span {
        border-style: solid;
        border-radius: 0.4em;
        border-width: 0.6px;
        padding: 0.3em 0.6em;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        gap: 0.5em;

        border-color: ${cssColors.brandEncyclopediaOfMath};
      }
    `}</style>
  </>
);

interface Props {
  ja?: string;
  en?: string;
  main?: string;
}

const EncyclopediaOfMath: FC<Props> = ({ en }) => {
  const En = en && (
    <Link href={`https://encyclopediaofmath.org/wiki/${en}`} passHref>
      <a target="_blank">{en}</a>
    </Link>
  );
  return <Badge>Encyclopedia Of Math | {En}</Badge>;
};

export default EncyclopediaOfMath;
