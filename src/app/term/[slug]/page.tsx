import TermPageContent from "./TermPageContent";
import { termOccuranceIndexMap } from "@/term-occurances.gen";
import { termDictMapBySlug } from "@/terms-index.gen";

export type ArticlePageProps = {
  readonly params: Promise<{
    readonly slug?: string;
  }>;
};

async function TermPage({ params }: ArticlePageProps) {
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

  return <TermPageContent slug={slug} term={term} index={index} />;
}

export default TermPage;

//export const revalidate = 60
export const dynamicParams = false;
export async function generateStaticParams() {
  return Object.entries(termOccuranceIndexMap).map(([slug]) => {
    return {
      slug,
    };
  });
}
