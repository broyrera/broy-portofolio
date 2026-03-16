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
  title: "Roy Aziz Barera — Informatics Engineer",
  description:
    "Portfolio of Roy Aziz Barera — Informatics Engineer specializing in Backend & Mobile Development. TypeScript, Go, Flutter, Kotlin.",
  keywords: [
    "Roy Aziz Barera",
    "Informatics Engineer",
    "Backend Developer",
    "Mobile Developer",
    "Portfolio",
    "TypeScript",
    "Go",
    "Flutter",
    "Kotlin",
  ],
  authors: [{ name: "Roy Aziz Barera" }],
  openGraph: {
    title: "Roy Aziz Barera — Informatics Engineer",
    description:
      "Portfolio of Roy Aziz Barera — Informatics Engineer specializing in Backend & Mobile Development.",
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
