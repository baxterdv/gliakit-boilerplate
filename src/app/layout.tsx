import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { features } from "@/lib/env";

// Body and headings — Inter, the theme's choice (see the theme block at the end of globals.css)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Code + labels — JetBrains Mono
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Talvo — Cash across every site",
    template: "%s · Talvo",
  },
  description:
    "Talvo keeps a brewery's cash in view: bills to approve, the next 90 days of balance, deals in the pipeline. Designed in GliaKit Studio on the GliaKit kit.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  // A staging or demo deployment stays out of search; links on it can still be followed.
  ...(features.noindex && { robots: { index: false, follow: true } }),
};

export const viewport: Viewport = {
  themeColor: "#f4f4f8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The data-* attributes switch on the theme's card effects, density and
    // component styles, as GliaKit Studio set them (see globals.css).
    <html
      lang="en"
      suppressHydrationWarning
      data-effects="drop inner"
      data-backdrop="plain"
      data-density="compact"
      data-button="flat"
      data-input="filled"
      data-badge="dot"
      data-table="zebra"
      data-avatar="initials"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
      </body>
    </html>
  );
}
