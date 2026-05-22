import type { Metadata } from "next";
import { LanguageProvider } from "./components/LanguageProvider";
import { CartProvider } from "./components/CartProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Mahrousa",
    default: "Mahrousa - Premium Restaurant in Tangier",
  },
  description: "Experience the finest culinary journey at Mahrousa, Tangier's premier restaurant. Delicious food, premium ambiance, and unforgettable memories.",
  keywords: ["restaurant", "Tangier", "premium food", "Mahrousa", "dining"],
  openGraph: {
    title: "Mahrousa - Premium Restaurant in Tangier",
    description: "Experience the finest culinary journey at Mahrousa, Tangier's premier restaurant.",
    url: "https://mahrousa.com", // Placeholder
    siteName: "Mahrousa",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Alexandria:wght@300;400;600;700;900&family=Outfit:wght@300;400;600;700;900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,700&family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <LanguageProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
