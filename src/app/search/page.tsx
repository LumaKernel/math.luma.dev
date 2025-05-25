import SearchUi from "@/components/pagefind/UiPageFind";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <NuqsAdapter>
      <Suspense>
        <SearchUi />
      </Suspense>
    </NuqsAdapter>
  );
}
