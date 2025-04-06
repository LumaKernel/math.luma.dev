export const essentialOfChildren = (
  children: React.ReactNode[],
): React.ReactNode[] => {
  return children.filter(
    (e: any) => e != null && typeof e !== "string" && e.type !== "br",
  );
};
