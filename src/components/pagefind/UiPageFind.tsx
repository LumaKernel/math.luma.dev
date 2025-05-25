"use client";
import * as pagefind from "@/pagefind.gen/pagefind";
import type { PagefindSearchResultItem } from "@/util/pagefind/types";
import Link from "next/link";
import { Suspense, useId, useState } from "react";
import useSWR from "swr";
import SharedApp from "../SharedApp";
import { cssColors } from "@/lib/colors";
import H2 from "../heading/H2";
import { stringTrimEnd } from "@luma-dev/string-util-ts";
import { parseAsString, useQueryState } from "nuqs";

pagefind
  .options({
    baseUrl: "/",
    basePath: "/pagefind.gen/",
  })
  .catch((error) => {
    console.error("Pagefind initialization failed:", error);
  });

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div>{children}</div>
      <style jsx>{`
        div {
          padding: 0 20px;
        }
      `}</style>
    </>
  );
}

export default function SearchUi() {
  const [queryInQs, setQueryInQs] = useQueryState(
    "query",
    parseAsString.withDefault(""),
  );
  const [query, setQuery] = useState(queryInQs);
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
    // eslint-disable-next-line @typescript-eslint/no-floating-promises -- setQuery側でthrottleされる
    setQueryInQs(value);
  };

  return (
    <SharedApp>
      <Wrapper>
        <>
          <div>
            <input
              type="text"
              placeholder="検索..."
              value={query}
              onChange={(ev) => handleQueryChange(ev.target.value)}
              // className={styles.search}
              autoFocus={queryInQs.length === 0}
            />
          </div>
          <style jsx>{`
            div {
              display: flex;
              padding: 0 20px;
              margin-top: 40px;
            }
            input {
              flex: 1;
              padding: 20px;
              color: ${cssColors.text};
              background-color: ${cssColors.bgInput};
              border-style: none;
              border-bottom-style: solid;
              border-width: 1px;
              border-color: ${cssColors.border};
            }
          `}</style>
        </>
        <>
          <div>
            {!search.isLoading && (
              <>
                <>
                  <div>
                    <H2>検索結果</H2>
                  </div>
                  <style jsx>{`
                    div {
                      margin-bottom: 20px;
                    }
                  `}</style>
                </>
                <>
                  <p>{search.data?.results.length}件</p>
                  <style jsx>{`
                    p {
                      margin: 0 0 24px 20px;
                      padding: 0;
                      font-size: 1.4rem;
                      color: ${cssColors.text};
                    }
                  `}</style>
                </>
              </>
            )}
            <>
              <div>
                {search.data?.results.map((result) => (
                  <Suspense key={result.id} fallback={<Loading />}>
                    <Result result={result} />
                  </Suspense>
                ))}
              </div>
              <style jsx>{`
                div {
                  display: flex;
                  flex-direction: column;
                  gap: 20px;
                }
              `}</style>
            </>
          </div>
        </>
      </Wrapper>
    </SharedApp>
  );
}

function Loading() {
  return (
    <>
      <div>
        <LoadingThreeMedDots />
      </div>
      <style jsx>{`
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
      `}</style>
    </>
  );
}

function LoadingThreeMedDots() {
  const size = 100;
  const r = 18;
  const anim1 = useId();
  const anim2 = useId();
  return (
    <>
      {[0, 1, 2].map((k) => (
        <svg
          key={k}
          width={size}
          height={size}
          viewBox="-50 -50 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <>
            <circle fill="#AAA" cx={0} cy={0} />
            <style jsx>{`
              circle {
                animation: ${anim1} 1s infinite;
                animation-delay: ${k * 0.2}s;
              }
              @keyframes ${anim1} {
                0% {
                  r: ${r}px;
                  opacity: 0.5;
                }
                60% {
                  r: ${r + 12}px;
                  opacity: 0.01;
                }
                100% {
                  r: ${r + 15}px;
                  opacity: 0;
                }
              }
            `}</style>
          </>
          <>
            <circle fill="#888" cx={0} cy={0} />
            <style jsx>{`
              circle {
                animation: ${anim2} 1s infinite;
                animation-delay: ${k * 0.2}s;
              }
              @keyframes ${anim2} {
                0% {
                  r: ${r}px;
                }
                50% {
                  r: ${r + 2}px;
                }
                100% {
                  r: ${r}px;
                }
              }
            `}</style>
          </>
        </svg>
      ))}
    </>
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
  const path = stringTrimEnd(data.url, ".html");

  return (
    <>
      <div>
        <Link href={path}>
          <p dangerouslySetInnerHTML={{ __html: data.excerpt }} />
        </Link>
      </div>
      <style jsx>{`
        div {
          padding: 20px;
          border-radius: 10px;
          background-color: ${cssColors.bgInput};
          & :global(mark) {
            background-color: #ec9dd134;
            color: ${cssColors.text};
          }
        }
        p {
          margin: 0;
        }
      `}</style>
    </>
  );
}
