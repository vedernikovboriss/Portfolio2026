import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";

import "./globals.css";
import LenisScroll from "./components/LenisScroll";
import Texture from "./components/Texture";
import Preloader from "./components/Preloader/Preloader";
import { SoundProvider } from "./components/SoundProvider";

const bdoGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/BDOGrotesk-Regular-BF648a656f74a27.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/BDOGrotesk-Medium-BF648a656f49882.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/BDOGrotesk-DemiBold-BF648a656f04a15.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/BDOGrotesk-Bold-BF648a656f312c4.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/BDOGrotesk-ExtraBold-BF648a656f31316.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-bdo-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BorisVV",
  description: "Web Portfolio of Boris Vedernikov",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bdoGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Script
          id="scroll-restoration"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){history.scrollRestoration="manual";var n=performance.getEntriesByType&&performance.getEntriesByType("navigation")[0];if(n&&n.type==="reload"&&location.hash){history.replaceState(null,"",location.pathname+location.search)}window.scrollTo(0,0)})();`,
          }}
        />
        <div aria-hidden className="top-site-shadow" />
        <Preloader />
        <LenisScroll />
        <SoundProvider>{children}</SoundProvider>
        <Texture />
      </body>
    </html>
  );
}
