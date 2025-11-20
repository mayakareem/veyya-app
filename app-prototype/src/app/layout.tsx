import { Geist } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import SiteHeader from "@/components/layout/SiteHeader";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import "@/styles/theme.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata = {
  title: "Veyya — Trusted on-demand services",
  description: "Book vetted providers with transparent pricing and real availability.",
  openGraph: {
    title: "Veyya",
    description: "On-demand services done right",
  },
  twitter: {
    card: "summary_large_image" as const,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.className} bg-background text-foreground flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <Footer />
            <Toaster />
            <Analytics />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
