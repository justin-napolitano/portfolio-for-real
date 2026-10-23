import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "../styles/reset.css";
import "./globals.css";
import "./brand.css";
import "./wiki.css";

export const viewport: Viewport = { themeColor: "#356349" };

export const metadata: Metadata = {
  metadataBase: new URL("https://docs.jnap.me"),
  title: {
    default: "Docs | Justin Napolitano",
    template: "%s | Justin Napolitano",
  },
  description:
    "Repository-owned documentation, browsable and searchable in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="brand-document">
        <header className="brand-header">
          <Link className="brand-title" href="/">Docs</Link>
          <nav aria-label="Primary">
            <Link href="/">Index</Link>
            <Link href="/log">Project log</Link>
            <Link href="/docs">Repositories</Link>
            <Link href="/#search">Search</Link>
          </nav>
        </header>
        {children}
        </div>
      </body>
    </html>
  );
}
