import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-var",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-var",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-var",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Roy Aziz Barera — Full-Stack Developer",
  description:
    "Portfolio of Roy Aziz Barera — Full-Stack Developer with strong backend foundation. Next.js, TypeScript, Go, Kotlin, Flutter, PostgreSQL.",
  keywords: [
    "Roy Aziz Barera",
    "Full-Stack Developer",
    "Backend Developer",
    "Next.js",
    "TypeScript",
    "Go",
    "Kotlin",
    "Flutter",
    "Portfolio",
  ],
  authors: [{ name: "Roy Aziz Barera" }],
  openGraph: {
    title: "Roy Aziz Barera — Full-Stack Developer",
    description:
      "Portfolio of Roy Aziz Barera — Full-Stack Developer with strong backend foundation. Next.js, TypeScript, Go, Kotlin, Flutter.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
