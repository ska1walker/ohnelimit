import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ohne Limit | German Rock Band",
  description: "Hart. Laut. Unaufhaltsam. Offizielle Website der deutschen Rock-Band Ohne Limit. Tour Dates, Musik, und mehr.",
  keywords: ["rock band", "german rock", "ohne limit", "live music", "concerts"],
  openGraph: {
    title: "Ohne Limit | German Rock Band",
    description: "Hart. Laut. Unaufhaltsam.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <body
        className={`${inter.variable} ${oswald.variable} antialiased bg-[#0a0a0a] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
