import { consumePromise } from "@/util/consume-promise";
import type { FC } from "react";
import { useEffect, useRef } from "react";
import * as WolframNotebookEmbedder from "wolfram-notebook-embedder";

interface Props {
  path: string;
}

interface StaticProps {
  preRendered: string;
}

const WolframNotebook: FC<Props & StaticProps> = ({ path, preRendered }) => {
  const el = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // TODO: useMutation
    consumePromise(
      (async () => {
        if (el.current) {
          await WolframNotebookEmbedder.embed(
            `https://www.wolframcloud.com/obj/${path}`,
            el.current,
          );
        }
      })(),
    );
  }, [el, path]);
  if (preRendered) {
    return (
      <div ref={el} dangerouslySetInnerHTML={{ __html: preRendered }}></div>
    );
  }
  return <div ref={el} />;
};

//export const getStaticProps: GetStaticProps<Props, StaticProps> | false =
//  typeof window === "undefined" &&
//  (async ({ props }) => {
//    const preRendered: string = await (
//      await fetch(`https://www.wolframcloud.com/statichtml/${props.path}`)
//    ).text();
//    return {
//      props: {
//        preRendered,
//      },
//    };
//  });

export default WolframNotebook;
