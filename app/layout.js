import { Gloock, Noto_Sans } from "next/font/google";
import Head from "next/head";

import "./globals.css";

const gloock = Gloock({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-gloock",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  style: ["normal"],
  display: "swap",
  variable: "--font-noto",
});

export const metadata = {
  title: "Valerium",
  description: "Valerium - ZK-based Smart Contract Wallet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="64x64" />
      </Head>
      <body className={`${gloock.variable} ${notoSans.variable} font-noto`}>
        {children}
      </body>
    </html>
  );
}
