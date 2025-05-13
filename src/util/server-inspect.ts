"use server";

export const serverInspect = async (v: unknown) => {
  const util = await import("util");
  const inspect = util.inspect;
  const result = inspect(v, { depth: null });
  return result;
};
