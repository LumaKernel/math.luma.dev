import Script from "next/script";
import Foo from "./Foo";
import SearchUi from "@/components/pagefind/UiPageFind";
// import * as pagefind from "@/pagefind/pagefind.js";

export default function SearchPage() {
  // // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  // console.log(((window as any).pagefind = pagefind));
  return (
    <>
      <Script src="/pagefind/pagefind-ui.js" />
      <SearchUi />
    </>
  );
  // <Foo />
  // <SearchUi />
}
