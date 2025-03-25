import { assertEquals } from "@std/assert";
import parseCodeClass from "../parse-code-class.ts";

Deno.test("parseCodeClass - empty input", () => {
  assertEquals(parseCodeClass(), {
    language: null,
    file: null,
  });
});

Deno.test("parseCodeClass - language only", () => {
  assertEquals(parseCodeClass("language-js"), {
    language: "js",
    file: null,
  });
});

Deno.test("parseCodeClass - language with file", () => {
  assertEquals(parseCodeClass("language-js:a.js"), {
    language: "js",
    file: {
      path: "a.js",
      search: "",
      searchParams: {},
      dir: "/",
      base: "a.js",
      ext: ".js",
      name: "a",
    },
  });
});
