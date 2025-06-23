import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";
import StyledJsxRegistry from "./registry";

export const metadata: Metadata = {
  title: "math.luma.dev",
  description: "Luma, and mathematics.",
};

type RootLayoutProps = React.PropsWithChildren;
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <StyledJsxRegistry>
          <ClientLayout>{children}</ClientLayout>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
