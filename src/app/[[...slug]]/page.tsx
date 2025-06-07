import Code from "@/components/code/Code";
import ArticleLayout from "@/components/layouts/ArticleLayout";
import SharedApp from "@/components/SharedApp";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Fragment } from "react";
import remarkMath from "remark-math";
import Debug from "@/components/Debug";
import H1 from "@/components/heading/H1";
import H2 from "@/components/heading/H2";
import H3 from "@/components/heading/H3";
import LumaKatex from "@/components/luma-katex/LumaKatex";
import Counter from "@/components/counter/Counter";
import Prove from "@/components/Prove";
import Note from "@/components/Note";
import { mdxIndex, tsExports } from "@/contents-index.gen";
import { getPageInfo } from "@/util/preparse";
import rehypeAddSlug from "@luma-dev/my-unified/rehype-add-slug";
import rehypeCleanInternal from "@luma-dev/my-unified/rehype-clean-internal";
import rehypeCodeMeta from "@luma-dev/my-unified/rehype-code-meta";
import rehypeCounter from "@luma-dev/my-unified/rehype-counter";
import type { RehypeKatexPluginParameters } from "@luma-dev/my-unified/rehype-katex";
import rehypeKatex from "@luma-dev/my-unified/rehype-katex";
import rehypeReplaceText from "@luma-dev/my-unified/rehype-replace-text";
import rehypeProcTerm, {
  type RehypeProcTermPluginParams,
} from "@luma-dev/my-unified/rehype-proc-term";
import rehypeSave from "@luma-dev/my-unified/rehype-save";
import rehypeWrap from "@luma-dev/my-unified/rehype-wrap";
import { makeGeneralAnchor } from "@/components/anchor/makeGeneralAnchor";
import Series from "@/components/series/Series";
import TermServer from "@/components/term/TermServer";
import { presets, termDict } from "@/terms-index.gen";
import { createTermServer } from "@/util/term-server";
import remarkBreaks from "remark-breaks";
import { pagefindAttrs } from "@/util/pagefind";
import remarkGfm from "remark-gfm";
import { makeComponents, makeServerMeta } from "@/util/server-meta";

const isProduction = process.env.NODE_ENV === "production";

export type ArticlePageProps = {
  readonly params: Promise<{
    readonly slug?: readonly string[];
  }>;
};
export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const linkPath = slug?.join("/") ?? "";
  const pageInfo = await getPageInfo(linkPath);
  const { mdx, index, info } = pageInfo;
  const termServer = await createTermServer({
    mdx,
    meta: info.meta,
    presets,
    termDict,
  });
  const serverMeta = makeServerMeta(pageInfo, isProduction);
  return (
    <SharedApp>
      <ArticleLayout serverMeta={serverMeta}>
        <main {...pagefindAttrs.body}>
          <MDXRemote
            source={info.contents}
            components={{
              ...tsExports,
              ...makeComponents(
                pageInfo,
                isProduction,
                {
                  a: makeGeneralAnchor(linkPath),
                  pre: Fragment,
                  LumaToc: Fragment,
                  LumaMdxLayout: Fragment,
                  LumaCounter: Counter,
                  LumaLoaded: Fragment,
                  Prove,
                  Note,
                  h1: H1,
                  h2: H2,
                  h3: H3,
                  Debug,
                },
                {
                  code: Code,
                  Term: TermServer,
                  Series,
                  LumaKatex,
                },
              ),
            }}
            options={{
              mdxOptions: {
                development: !isProduction,
                remarkRehypeOptions: {
                  allowDangerousHtml: true,
                },
                remarkPlugins: [
                  // remarkFrontmatter,
                  remarkGfm,
                  remarkBreaks,
                  remarkMath,
                  // remarkTerm,
                  // remarkMeta,
                ],
                rehypePlugins: [
                  rehypeAddSlug,
                  rehypeReplaceText,
                  // rehypeKatex,
                  [
                    rehypeKatex,
                    {
                      context: index.texContext,
                    } satisfies RehypeKatexPluginParameters,
                  ],
                  [
                    rehypeProcTerm,
                    {
                      termProcessor: termServer,
                    } satisfies RehypeProcTermPluginParams,
                  ],
                  rehypeSave,
                  rehypeCounter,
                  rehypeCodeMeta,

                  rehypeWrap,

                  rehypeCleanInternal,
                ],
              },
            }}
          />
        </main>
      </ArticleLayout>
    </SharedApp>
  );
}

//export const revalidate = 60
export const dynamicParams = false;
export async function generateStaticParams() {
  return Object.entries(mdxIndex).map(([linkPath]) => {
    return {
      slug: linkPath === "" ? [] : linkPath.split("/"),
    };
  });
}
