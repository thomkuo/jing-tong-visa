import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const playfair = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

// next/font types are missing "chinese-simplified" for Noto Sans SC; cast to bypass the type gap
const notoSansSC = Noto_Sans_SC({
  subsets: ["chinese-simplified" as "latin"],
  variable: "--font-noto-sc",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jingtongvisa.com"),
  title: "Jing Tong Visa Services",
  description: "Professional China visa services in Washington D.C.",
  openGraph: {
    siteName: "Jing Tong Visa Services",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${dmSans.variable} ${notoSansSC.variable} font-sans bg-bg text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
