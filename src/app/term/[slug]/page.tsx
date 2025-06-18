import MainLayout from "@/components/layouts/MainLayout";
import TermClient from "@/components/term/TermClient";
import Foo from "@/contents/sand/comps/Foo";
import { termOccuranceIndexMap } from "@/term-occurances.gen";
import { termDictMapBySlug } from "@/terms-index.gen";

export type ArticlePageProps = {
  readonly params: Promise<{
    readonly slug?: string;
  }>;
};
export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug: slugEncoded } = await params;
  if (slugEncoded == null) {
    throw new Error("Slug is required");
  }
  const slug = decodeURIComponent(slugEncoded);
  const index = Object.hasOwn(termOccuranceIndexMap, slug)
    ? termOccuranceIndexMap[slug]
    : null;
  const term = Object.hasOwn(termDictMapBySlug, slug)
    ? termDictMapBySlug[slug]
    : null;
  if (term == null) {
    throw new Error(`No index found for slug: ${slug}`);
  }

  return (
    <MainLayout>
      <main>
        <h1>
          <TermClient
            text={term.main.text}
            reference={term.main.text}
            term={term}
            showRuby={true}
            refIndex={0}
            termContainer={null}
          />
        </h1>
        <h2>定義している箇所</h2>
        {index?.h2
          .slice(0, 3)
          .map(({ linkPath, refIndex, slug }) => (
            <Foo
              key={`${linkPath}-${refIndex}`}
              linkPath={linkPath}
              targetTermRef={slug}
              targetTermRefIndex={refIndex}
            />
          ))}
        <h2>使用している箇所</h2>
        {index?.others
          .slice(0, 2)
          .map(({ linkPath, refIndex, slug }) => (
            <Foo
              key={`${linkPath}-${refIndex}`}
              linkPath={linkPath}
              targetTermRef={slug}
              targetTermRefIndex={refIndex}
            />
          ))}
      </main>
    </MainLayout>
  );
}

//export const revalidate = 60
export const dynamicParams = false;
export async function generateStaticParams() {
  return Object.entries(termOccuranceIndexMap).map(([slug]) => {
    return {
      slug,
    };
  });
}
