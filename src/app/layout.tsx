import type { Metadata } from "next";
import { Nunito_Sans, Roboto } from "next/font/google";
import { FC, ReactNode } from "react";
import "../../src/index.scss";
import MainProvider from "./MainProvider";
import { ChildrenType } from "@/Types/Layout";
import NoSsr from "@/Utils/NoSsr";
import NextTopLoader from "nextjs-toploader";

const nunito = Nunito_Sans({
  weight: ["200", "300", "400","500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sahajanand",
  description: "Generated by create next app",
};

export default function RootLayout({ children }:ChildrenType) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body suppressHydrationWarning={true} className={nunito.className || roboto.className}>
        <NoSsr>
          <MainProvider>
            <NextTopLoader color="#cca270" showSpinner={false} />
            {children}
            </MainProvider>
        </NoSsr>
      </body>
    </html>
  );
};

