export const cssColorProperties = {
  text: "--color-text",
  decorationPrimary: "--color-deco-pri",
  decorationSecondary: "--color-deco-sec",
  revertedText: "--color-rev-text",
  em1: "--color-em1",
  em2: "--color-em2",
  em3: "--color-em3",
  em4: "--color-em4",
  em1Dim: "--color-em1-dim",
  em2Dim: "--color-em2-dim",
  em3Dim: "--color-em3-dim",
  em4Dim: "--color-em4-dim",
  bgPrimary: "--color-bg-pri",
  bgRevPrimary: "--color-bg-rev-pri",
  bgEm1: "--color-bg-em1",
  bgComment: "--color-bg-comment",
  brandWikipedia: "--color-brand-wikipedia",
  brandEncyclopediaOfMath: "--color-brand-eom",
  border: "--color-border",
};

export const cssColors = Object.fromEntries(
  Object.entries(cssColorProperties).map(([key, value]) => [
    key,
    `var(${value})`,
  ]),
) as Record<keyof typeof cssColorProperties, string>;
