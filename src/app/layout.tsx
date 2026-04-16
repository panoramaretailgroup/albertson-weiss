import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import AuthProvider from "@/components/AuthProvider";
import ToastProvider from "@/components/ToastProvider";
import Analytics from "@/components/Analytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://albertsonweiss.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Albertson & Weiss Motors",
    default: "Albertson & Weiss Motors | Inversiones en Vehículos Premium",
  },
  description:
    "Invierte en vehículos premium americanos importados a Europa. Rentabilidad del 25% anualizado con contratos de préstamo privado regulados.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Albertson & Weiss Motors",
    title: "Albertson & Weiss Motors | Inversiones en Vehículos Premium",
    description:
      "Invierte en vehículos premium americanos importados a Europa. Rentabilidad del 25% anualizado con contratos de préstamo privado regulados.",
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
    title: "Albertson & Weiss Motors | Inversiones en Vehículos Premium",
    description:
      "Invierte en vehículos premium americanos importados a Europa. Rentabilidad del 25% anualizado.",
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
    <html lang="es" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased">
        <a href="#main-content" className="skip-link">
          Ir al contenido principal
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
