"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";

const SearchUi = dynamic(() => import("@/components/pagefind/UiPageFind"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Foo() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <>
      <div ref={ref} id="search" className="pagefind-ui" />
      <SearchUi />
    </>
  );
}
