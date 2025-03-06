import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "math.luma.dev",
  description: "Luma, and mathematics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
