import React from "react";
import type { FC } from "react";

interface Props {
  lang?: string;
  children: React.ReactNode;
}

const IpynbRaw: FC<Props> = ({ children }) => {
  return (
    <>
      <div>{children}</div>
      <style jsx>
        {`
        @media (prefers-color-scheme: dark) {
          :global(.root:not(.light)) div :global(.image-wrapper) {
            display: inline-flex;
            position: relative;
          }
          :global(.root:not(.light)) div :global(.image-wrapper img) {
            background: #ffffff;
            opacity: 0.8;
          }
          :global(.root:not(.light)) div :global(.image-wrapper::after) {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            mix-blend-mode: difference;
            background: hsl(0deg 0% 96%);
            width: 100%;
            height: 100%;
            pointer-events: none;
          }
        }
        :global(.root.dark) div :global(.image-wrapper) {
          display: inline-flex;
          position: relative;
        }
        :global(.root.dark) div :global(.image-wrapper img) {
          opacity: 0.8;
        }
        :global(.root.dark) div :global(.image-wrapper::after) {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          mix-blend-mode: difference;
          background: hsl(0deg 0% 96%);
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
      `}
      </style>
    </>
  );
};

export default IpynbRaw;
