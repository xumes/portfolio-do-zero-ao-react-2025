import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Portfólio",
  description: "Meu Porftólio como desenvolvedor de software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <div className="flex flex-col min-h-screen">
        <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Toaster />
        <Footer />
        </div>
      </body>
    </html>
  );
}
