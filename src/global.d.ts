import type { PagefindApi } from "@/util/pagefind/types";

declare namespace JSX {
  interface IntrinsicElements {
    // rb: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}

declare module "@/pagefind.gen/pagefind" {
  declare const pagefind: PagefindApi;
  export = pagefind;
}
