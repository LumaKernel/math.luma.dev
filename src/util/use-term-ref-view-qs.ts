/* eslint-disable react-hooks/rules-of-hooks */
import { useSearchParams } from "next/navigation";

export const useTermRefViewQs = () => {
  // static build中はterm-ref-view扱いはしない
  if (typeof window === "undefined") {
    return null;
  }

  const searchParams = useSearchParams();
  const ref = searchParams.get("termRefView.ref");
  const index = parseInteger(searchParams.get("termRefView.index"));

  if (typeof ref === "string" && typeof index === "number") {
    return {
      ref,
      index,
    };
  }
  return null;
};

const parseInteger = (value: string | null): number | null => {
  if (value === null) return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? null : parsed;
};
