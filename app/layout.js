import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Canding",
  description: "Chat Bot",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <body className={inter.className}>
        <Navbar />

        {children}
        <Analytics />
      </body>
    </html>
  );
}
