import type { Metadata, Viewport } from "next";
import { Sora, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

// display font (headings) — mapped onto --font-orbitron so .font-display picks it up
const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-orbitron",
  display: "swap",
});

// body font — mapped onto --font-rajdhani
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

// editorial italic serif — used only for the hero accent word
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
  variable: "--font-serif",
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
  themeColor: "#08080f",
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
    <html lang="en" className={`dark ${sora.variable} ${inter.variable} ${instrumentSerif.variable}`}>
      <body className="bg-bg text-text antialiased min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
