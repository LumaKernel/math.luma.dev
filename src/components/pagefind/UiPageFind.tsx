"use client";
import * as pagefind from "@/pagefind.gen/pagefind";
import type { PagefindSearchResultItem } from "@/util/pagefind/types";
import Link from "next/link";
import { Suspense, useState } from "react";
import useSWR from "swr";
import styles from "./styles.module.css";

pagefind
  .options({
    baseUrl: "/",
    basePath: "/pagefind.gen/",
  })
  .catch((error) => {
    console.error("Pagefind initialization failed:", error);
  });

export default function SearchUi() {
  const [query, setQuery] = useState<string>("");
  const search = useSWR(
    ["pagefind", "search", query],
    async () => {
      // if (query.trim().length === 0) return null;
      if (query.trim().length === 0) return Promise.race([]);
      const res = await pagefind.search(query);
      return res;
    },
    {},
  );

  const handleQueryChange = (value: string) => {
    setQuery(value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(ev) => handleQueryChange(ev.target.value)}
        className={styles.search}
      />
      <div id="results" className={styles.result}>
        {!search.isLoading && (
          <h2 className={styles.subHeading}>検索結果...</h2>
        )}
        {search.data?.results.map((result) => (
          <Suspense key={result.id} fallback={"Loading..."}>
            <Result result={result} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}

// 検索結果として出力するものを作成

type Props = {
  readonly result: PagefindSearchResultItem;
};
function Result({ result }: Props) {
  const data = useSWR(["search", "result", result.id], () => result.data(), {
    suspense: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  }).data;

  return (
    <div className={styles.container}>
      <Link href={data.url}>
        <p dangerouslySetInnerHTML={{ __html: data.excerpt }} />
      </Link>
    </div>
  );
}
