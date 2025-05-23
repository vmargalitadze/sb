import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "../globals.css";
import Header from "../../components/Header/Header";

import Footer from "../../components/Footer/Footer";
import {NextIntlClientProvider} from 'next-intl';
import SIdeLogo from "../../components/SideLogo/SideLogo";
import {
  ClerkProvider,

} from '@clerk/nextjs'

const quicksand = Quicksand({
  variable: "--font-quicksand",  
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "S&B",
  description: "Generated by create next app",
  icons:{
  icon: "/favicon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>


    <html lang="en" >
      <body
        className={`${quicksand.variable}  antialiased`}
      >
        <NextIntlClientProvider>


        <Header />
        <SIdeLogo />
        {children}
      <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
