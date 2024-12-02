import type { FC } from 'react';

interface Props {
  [rest: string]: string;
}
const Image: FC<Props> = ({ ...props }) => (
  <>
    <div className="image-wrapper-wrapper">
      <div className="image-wrapper">
        <img {...props} />
      </div>
    </div>
    <style jsx>{`
      .image-wrapper-wrapper {
        display: flex;
        justify-content: center;
      }
    `}</style>
  </>
);

export default Image;
