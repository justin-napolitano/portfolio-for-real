import type { Metadata } from "next";
import { Fraunces, Geist_Mono, Space_Grotesk } from "next/font/google";
import "../styles/reset.css";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body className={`${spaceGrotesk.variable} ${fraunces.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
