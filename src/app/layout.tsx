import type { Metadata } from "next";
import { Cormorant_Garamond, Raleway, DM_Sans } from "next/font/google";
import AuthProvider from "@/components/AuthProvider";
import ToastProvider from "@/components/ToastProvider";
import Analytics from "@/components/Analytics";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400"],
  style: ["normal", "italic"],
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["200", "300", "400", "500"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://albertsonweiss.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Albertson & Weiss Motors",
    default: "Albertson & Weiss Motors | Private Investment Platform",
  },
  description:
    "Invest in hand-selected luxury vehicles sourced from the US market, imported and sold across Europe. Private investment platform for luxury vehicle arbitrage.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Albertson & Weiss Motors",
    title: "Albertson & Weiss Motors | Private Investment Platform",
    description:
      "Invest in hand-selected luxury vehicles sourced from the US market, imported and sold across Europe.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Albertson & Weiss Motors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Albertson & Weiss Motors",
    description:
      "Invest in hand-selected luxury vehicles sourced from the US market.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${raleway.variable} ${dmSans.variable}`}
    >
      <body className="font-sans antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <AuthProvider>
          <ToastProvider>
            <div id="main-content">{children}</div>
          </ToastProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
