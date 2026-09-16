import type { Metadata } from "next";
import { Bebas_Neue, Caveat_Brush } from "next/font/google";
import "./globals.css";

const display = Bebas_Neue({ variable: "--font-display", subsets: ["latin"], weight: "400", display: "swap" });
const brush = Caveat_Brush({ variable: "--font-brush", subsets: ["latin"], weight: "400", display: "swap" });

export const metadata: Metadata = {
  title: "Jukrachai Plongmai | Systems & Security",
  description: "Portfolio and resume for Jukrachai Plongmai, a Computer Engineering student focused on systems, networks, and cybersecurity.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${brush.variable}`}>
      <body>{children}</body>
    </html>
  );
}
