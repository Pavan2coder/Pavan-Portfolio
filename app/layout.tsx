import type { Metadata, Viewport } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-orbitron",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pavan — AI Engineer • Neural AI Portfolio",
  description:
    "An AI operating system style portfolio. Pavan — AI Engineer & ML Developer building intelligent systems.",
  metadataBase: new URL("https://pavan.dev"),
  openGraph: {
    title: "Pavan — AI Engineer",
    description: "JARVIS-inspired portfolio of an AI engineer.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable}`}>
      <body className="bg-bg text-text antialiased min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
