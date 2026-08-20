import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ABLE — Digital products built to move",
  description:
    "ABLE is an independent digital studio helping ambitious teams turn clear strategy into memorable products and websites.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
