import type { NextConfig } from "next";

const envValueOf = (
  env: NodeJS.ProcessEnv,
  key: string,
): string | undefined => {
  const value = env[key];
  if (typeof value !== "string" || value.length === 0) {
    return undefined;
  }
  return value;
};

const mode = (() => {
  const mode = envValueOf(process.env, "NEXT_BUILD_MODE");
  if (mode === undefined) {
    if (process.env.NODE_ENV === "development") {
      return "dev";
    }
    return "build";
  }
  switch (mode) {
    case "prebuild":
    case "dev":
      return mode;
    default:
      throw new Error(`Invalid NEXT_BUILD_MODE: ${mode}`);
  }
})();

const nextConfig: NextConfig = {
  distDir: `next-build/${mode}`,
};

export default nextConfig;
