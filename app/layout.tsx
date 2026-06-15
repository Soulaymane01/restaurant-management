import type { Metadata } from "next";
import { LanguageProvider } from "./components/LanguageProvider";
import { CartProvider } from "./components/CartProvider";
import { AuthProvider } from "./components/AuthProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Notifications",
    default: "Notifications - Real-Time Dashboard",
  },
  description: "Real-time notification system powered by Redis pub/sub. Stay updated with instant alerts and events.",
  keywords: ["notifications", "real-time", "redis", "dashboard", "pub-sub"],
  openGraph: {
    title: "Notifications - Real-Time Dashboard",
    description: "Real-time notification system powered by Redis pub/sub.",
    siteName: "Notification System",
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
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Outfit:wght@300;400;600;700;900&family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <LanguageProvider>
          <CartProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
