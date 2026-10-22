import type { Metadata } from "next";
import Link from "next/link";
import "../styles/reset.css";
import "./globals.css";
import "./brand.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.local"),
  title: {
    default: "Justin Napolitano | Portfolio",
    template: "%s | Justin Napolitano",
  },
  description:
    "Case studies, experiments, and prototypes spanning civic data, geospatial ops, and workflow design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="brand-header">
          <Link className="brand-title" href="/">Docs</Link>
          <nav aria-label="Primary">
            <Link href="/">Index</Link>
            <Link href="/projects">Archive</Link>
            <a href="mailto:hello@justin.is">Contact</a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
