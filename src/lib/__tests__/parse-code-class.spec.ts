import parseCodeClass from "../parse-code-class";
import { describe, it } from "vitest";

describe("parseCodeClass", () => {
  it("parse code class", ({ expect }) => {
    expect(parseCodeClass()).toEqual({
      language: null,
      file: null,
    });
    expect(parseCodeClass("language-js")).toEqual({
      language: "js",
      file: null,
    });
    expect(parseCodeClass("language-js:a.js")).toEqual({
      language: "js",
      file: {
        path: "a.js",
        dir: "/",
        base: "a.js",
        ext: ".js",
        name: "a",
        search: "",
        searchParams: {},
      },
    });
  });
});
