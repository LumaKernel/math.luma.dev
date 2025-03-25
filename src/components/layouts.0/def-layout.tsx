import React from "react";
import H1 from "@/components/heading/H1.tsx";
// import type { QuickTermDefinition } from "@/lib/quick-term-dict.ts"; // Commented for Deno compatibility
// import { quickTerms } from "@/lib/quick-term-dict.ts"; // Commented for Deno compatibility
// import type { PageConfig, PageLocation } from "@/components/util/pages.ts"; // Commented for Deno compatibility
// import { locEq } from "@/components/util/pages.ts"; // Commented for Deno compatibility

// Mock types for Deno compatibility
interface PageConfig {
  title?: string;
  termUsage: {
    defined: Array<{
      termName: string;
      placeSlug?: string | null;
    }>;
    used: Array<{
      termName: string;
      placeSlug?: string | null;
    }>;
  };
}

interface PageLocation {
  linkPath: string;
  subdomain: string;
}

// Simple implementation for Deno compatibility
const locEq = (loc1: PageLocation, loc2: PageLocation): boolean => {
  return loc1.linkPath === loc2.linkPath;
};
import QuickTerm from "@/components/quick-term.tsx";
import ShowError from "@/components/show-error.tsx";
// import { NextSeo } from 'next-seo'; // Commented for Deno compatibility
import type { FC } from "react";
import MainLayout from "@/components/layouts.0/main-layout.tsx";
// import pagesMetaData from '@blogkit/blog-components/pages-metadata.json' - Commented for Deno compatibility
const pagesMetaData: any[] = [];
import H2 from "@/components/heading/H2.tsx";
import PathBreadcrumbs from "@/components/src/path-breadcrumbs.tsx";
// import Link from 'next/link'; // Commented for Deno compatibility
import { hostOf } from "@/components/util/index.ts";

// Mock definitions for Deno compatibility
type QuickTermDefinition = {
  text: string;
  jaRuby?: string;
  slug?: string;
};
const quickTerms: Record<string, QuickTermDefinition> = {};

interface Placement {
  loc: PageLocation;
  pageConfig: PageConfig;
  slug?: string | null;
}

const quickTermBySlug = Object.fromEntries<
  [string, QuickTermDefinition] | undefined
>(
  Object.entries(quickTerms).map(([key, v]) => {
    if (typeof v?.slug === "string") {
      return [v.slug, [key, v]];
    }
    return [key, [key, v]];
  }) as any,
);

interface Props2 {
  usage: Placement[];
}
const TermUsageListInPage: FC<Props2> = ({ usage }) => {
  const list: (string | null | undefined)[] = [];
  let last = undefined as string | null | undefined;
  usage.forEach((e) => {
    if (last !== e.slug) {
      list.push(last);
    }
    last = e.slug;
  });
  list.push(last);

  const {
    loc: { linkPath, subdomain },
    pageConfig: { title },
  } = usage[0];

  return (
    <>
      <span>{title}</span>
      <br />
      {
        /* PathBreadcrumbs commented out for Deno compatibility
      <span>
        <PathBreadcrumbs path={linkPath} subdomain={subdomain} />
      </span>
      */
      }
      <span>Path: {linkPath}</span>
      <br />
      <ul>
        {list
          .filter((e) => e)
          .map((e) => (
            <li key={e}>
              {
                /* Link component commented out for Deno compatibility
              <Link href={`${hostOf(subdomain)}/${linkPath}#${e}`} passHref>
                <a>#{e}</a>
              </Link>
              */
              }
              <a href={`${hostOf(subdomain)}/${linkPath}#${e}`}>#{e}</a>
            </li>
          ))}
      </ul>
    </>
  );
};

const Li = (props: React.ComponentProps<"div">) => (
  <>
    <li {...props} />
    <style jsx>
      {`
      li {
        margin-top: 0.6em;
      }
    `}
    </style>
  </>
);

interface Props1 {
  usage: Placement[];
}
const TermUsageList: FC<Props1> = ({ usage }) => {
  const list: React.ReactNode[] = [];
  let tmp: Placement[] = [];
  let last = undefined as Placement | undefined;
  usage.forEach((e) => {
    if (last && locEq(last.loc, e.loc)) {
      tmp.push(e);
    } else {
      if (tmp.length) list.push(<TermUsageListInPage usage={tmp} />);
      tmp = [e];
    }
    last = e;
  });
  if (tmp.length) list.push(<TermUsageListInPage usage={tmp} />);
  return (
    <ul>
      {list.map((e, i) => <Li key={i}>{e}</Li>)}
    </ul>
  );
};

interface Props {
  children?: React.ReactNode;
  subdomain: string;
  name: string;
}

const DefLayout: FC<Props> = ({ children, subdomain, name }) => {
  const [w, term] = quickTermBySlug[name] ?? [undefined, undefined];
  if (!w || !term) return <ShowError error={`name "${name}" not found`} />;

  const titleText = term.jaRuby ? `${term.text}（${term.jaRuby}）` : term.text;

  const defined: Placement[] = pagesMetaData
    .map((e): Placement | null => {
      const { loc, pageConfig } = e;
      if (pageConfig) {
        for (const { termName, placeSlug } of pageConfig.termUsage.defined) {
          if (termName === w) {
            return {
              loc,
              pageConfig,
              slug: placeSlug,
            };
          }
        }
      }
      return null;
    })
    .filter((e) => e) as any;

  const used: Placement[] = pagesMetaData
    .map((e): Placement | null => {
      const { loc, pageConfig } = e;
      if (pageConfig) {
        for (const { termName, placeSlug } of pageConfig.termUsage.used) {
          if (termName === w) {
            return {
              loc,
              pageConfig,
              slug: placeSlug,
            };
          }
        }
      }
      return null;
    })
    .filter((e) => e) as any;

  return (
    <MainLayout>
      {
        /* NextSeo component commented out for Deno compatibility
      <NextSeo
        title={`${titleText} - ${subdomain}.luma.dev`}
        description={term.text}
        canonical={`${hostOf(subdomain)}/terms/${name}`}
      />
      */
      }
      <H1>
        <QuickTerm w={w} o />
      </H1>
      <p>
        <QuickTerm w={w} isFirst />
      </p>
      {children}
      <H2 slug="定義箇所" lastH1Slug="definitions">定義箇所</H2>
      <TermUsageList usage={defined} />
      <H2 slug="使用箇所" lastH1Slug="usages">使用箇所</H2>
      <TermUsageList usage={used} />
      {process.env.NODE_ENV === "development" && (
        <div>
          <h2>デバッグ情報</h2>
          <ul>
            <li>w: {w}</li>
          </ul>
        </div>
      )}
    </MainLayout>
  );
};

export default DefLayout;
