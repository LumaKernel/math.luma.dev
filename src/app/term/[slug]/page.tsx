import TermLayout from "@/components/layouts/TermLayout";
import TermPageContent from "./TermPageContent";
import { termOccurrenceIndexMap } from "@/term-find.gen";
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
  const index = Object.hasOwn(termOccurrenceIndexMap, slug)
    ? termOccurrenceIndexMap[slug]
    : null;
  const term = Object.hasOwn(termDictMapBySlug, slug)
    ? termDictMapBySlug[slug]
    : null;
  if (term == null) {
    throw new Error(`No index found for slug: ${slug}`);
  }

  return (
    <TermLayout>
      <TermPageContent term={term} index={index} />
    </TermLayout>
  );
}

export default TermPage;

//export const revalidate = 60
export const dynamicParams = false;
export async function generateStaticParams() {
  return Object.entries(termOccurrenceIndexMap).map(([slug]) => {
    return {
      slug,
    };
  });
}
