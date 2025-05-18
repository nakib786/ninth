import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InteractiveBackground from "@/components/ui/InteractiveBackground";
import WhatsAppChat from "@/components/WhatsAppChat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IRCC Consultant Portal - Professional Immigration Services",
  description: "Expert immigration consulting services for all Canadian immigration programs",
  icons: {
    icon: [
      { url: '/favicon.svg' }
    ],
    apple: { url: '/favicon.svg' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.className} antialiased text-gray-900 dark:text-gray-100 min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <InteractiveBackground />
          <Header />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
          <WhatsAppChat />
        </ThemeProvider>
      </body>
    </html>
  );
}
