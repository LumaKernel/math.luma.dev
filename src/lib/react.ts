export const essentialOfChildren = (
  children: React.ReactNode[],
): React.ReactNode[] => {
  return children.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    (e: any) => e != null && typeof e !== "string" && e.type !== "br",
  );
};
