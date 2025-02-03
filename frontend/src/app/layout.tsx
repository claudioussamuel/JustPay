import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";
import { Providers } from "@/components/Provider";


const bowlby = localFont({
  src: '../../public/fonts/BowlbyOneSC-Regular.ttf',
  variable: '--font-bowlby'
})

const dmMono = localFont({
  src: '../../public/fonts/DMMono-Regular.ttf',
  variable: '--font-dmMono'
})

const playWright = localFont({
  src: '../../public/fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf',
  variable: '--font-playWright'
})

export const metadata: Metadata = {
  title: "JustPay",
  description: "Payment made with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bowlby.variable} ${dmMono.variable} ${playWright.variable} antialiased`}
      >
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  );
}
