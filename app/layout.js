import { Gloock, Noto_Sans } from "next/font/google";

import "./globals.css";

const gloock = Gloock({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  style: ["normal"],
  display: "swap",
});

export const metadata = {
  title: "Valerium",
  description: "Valerium - ZK-based Smart Contract Wallet",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${gloock.className} ${notoSans.className}`}>
        {children}
      </body>
    </html>
  );
}
