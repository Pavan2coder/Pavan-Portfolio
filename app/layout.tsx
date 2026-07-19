import type { Metadata, Viewport } from "next";
import {
  Chakra_Petch,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
  Roboto_Flex,
} from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";

/* Display / headings — sharp, squared, techy/HUD terminal character */
const chakra = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

/* Variable font for the interactive TextPressure band (wght + wdth axes) */
const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-pressure",
  display: "swap",
});

/* Body / UI — clean geometric sans */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

/* Small mono labels / readouts */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description:
    "Athava Sri Pavan — AI & Full-Stack Engineer. B.Tech CSE student building ML-powered platforms, MERN web apps, and Flutter mobile apps.",
  metadataBase: new URL("https://pavan-ai-portfolio-beta.vercel.app"),
  keywords: [
    "Athava Sri Pavan",
    "AI Engineer",
    "Machine Learning",
    "Full Stack Developer",
    "MERN",
    "Flutter",
    "Portfolio",
  ],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#06080d",
  width: "device-width",
  initialScale: 1,
};

/* No-FOUC: dark is the default ground; only flip to light if stored. */
const themeInit = `
(function(){try{var t=localStorage.getItem('aurora-theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${chakra.variable} ${jakarta.variable} ${jetbrainsMono.variable} ${robotoFlex.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-screen text-text antialiased">{children}</body>
    </html>
  );
}
