import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/global/navbar";
import Footer from "@/components/global/footer";
import { Toaster } from "@/components/ui/sonner";
import { Source_Sans_3 } from "next/font/google";

export const metadata: Metadata = {
  title: "Logan Keene | Professional Web Developer",
  description: "I am a professional full-stack web developer specializing in AI, React.js, Next.js, Frontend, Ecommerce, and SEO.",
};

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sourceSans.className} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
