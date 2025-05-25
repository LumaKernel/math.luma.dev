import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "math.luma.dev",
  description: "Luma, and mathematics.",
};

type RootLayoutProps = React.PropsWithChildren;
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
