import React from "react";
import type { FC } from "react";
import { useEffect, useRef } from "react";
// import * as WolframNotebookEmbedder from 'wolfram-notebook-embedder'; // Commented for Deno compatibility
// import type { GetStaticProps } from "@/types/index.ts"; // Commented for Deno compatibility

// Mock type for Deno compatibility
type GetStaticProps<P, Q> = (arg: { props: P }) => Promise<{ props: Q }>;

// Mock implementation for Deno compatibility
const WolframNotebookEmbedder = {
  embed: async (url: string, element: HTMLElement) => {
    console.log(`Would embed ${url} into element`);
    return null;
  },
};

interface Props {
  path: string;
}

interface StaticProps {
  preRendered: string;
}

const WolframNotebook: FC<Props & StaticProps> = ({ path, preRendered }) => {
  const el = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    void (async () => {
      if (el.current) {
        await WolframNotebookEmbedder.embed(
          `https://www.wolframcloud.com/obj/${path}`,
          el.current,
        );
      }
    })();
  }, [el, path]);
  if (preRendered) {
    return (
      <div ref={el} dangerouslySetInnerHTML={{ __html: preRendered }}></div>
    );
  }
  return <div ref={el} />;
};

export const getStaticProps: GetStaticProps<Props, StaticProps> | false =
  typeof window === "undefined" &&
  (async ({ props }: { props: Props }) => {
    const preRendered: string = await (await fetch(
      `https://www.wolframcloud.com/statichtml/${props.path}`,
    )).text();
    return {
      props: {
        preRendered,
      },
    };
  });

export default WolframNotebook;
