import type { Metadata } from "next";
import { EB_Garamond, Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { PortfolioLoader } from "@/components/loader/PortfolioLoader";
import { LenisProvider } from "@/components/smooth-scroll/LenisProvider";
import { Pointer } from "@/components/ui/pointer";
import { cn } from "@/lib/utils";

const ghosthey = localFont({
  src: [
    {
      path: "../public/fonts/ghosthey-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ghosthey-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-ghosthey",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YKSH",
  description: "YKSH's Portfolio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        ebGaramond.variable,
        spaceGrotesk.variable,
        ghosthey.variable,
        "font-sans",
      )}
    >
      <body className="flex min-h-full flex-col bg-[#090909] text-[#F5F5F5]">
        <PortfolioLoader />
        <LenisProvider />
        {children}
        <Pointer style={{ translateX: "-50%", translateY: "-50%", zIndex: 10000 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ball-cursor.webp"
            alt=""
            width={40}
            height={40}
            className="hidden size-10 select-none [@media(any-hover:hover)_and_(any-pointer:fine)]:block"
          />
        </Pointer>
      </body>
    </html>
  );
}
