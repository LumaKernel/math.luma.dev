import * as posixPath from "@std/path/posix";

export interface CodeClass {
  language: string | null;
  file: {
    path: string;
    search: string;
    searchParams: Record<string, string | undefined>;
    dir: string;
    base: string;
    ext: string;
    name: string;
  } | null;
}

const parseCodeClass = (codeClass?: string): CodeClass => {
  let language: string | null = null;
  let file: CodeClass["file"] | null = null;
  if (codeClass) {
    const groups = codeClass.match(/^language-([^:]*)(?::(.*))?/);
    if (groups) {
      [, language] = groups;
      const path = groups[2] as string | undefined;
      if (path != null) {
        const url = new URL(`file:///${path}`);
        const { base, name, ext, dir } = posixPath.parse(url.pathname);
        file = {
          path,
          search: url.search,
          searchParams: Object.fromEntries(url.searchParams.entries()),
          dir,
          base,
          ext,
          name,
        };
      }
    }
  }
  return {
    language,
    file,
  };
};

export default parseCodeClass;
