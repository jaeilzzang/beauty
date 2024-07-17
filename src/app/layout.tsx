import "@/styles/_reset.scss";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/organism/layout/footer";
import { Header } from "@/components/organism/layout/header";
import Providers from "@/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BeautyU",
  description: "BeautyU",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div id="modal-root" />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
