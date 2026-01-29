import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth/next";
import 'svgmap/dist/svgMap.min.css';
import SessionProvider from "@/utils/SessionProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/Providers";
import SessionTimeoutWrapper from "@/components/SessionTimeoutWrapper";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: "Cibaduyut Authentic Leather | Sepatu & Sandal Kulit Asli Bandung",
  description: "Temukan koleksi sepatu dan sandal kulit asli berkualitas tinggi dari Cibaduyut, Bandung. Produk kerajinan tangan dengan kualitas terjamin.",
  keywords: "sepatu kulit, sandal kulit, cibaduyut, bandung, kulit asli, kerajinan kulit, leather shoes",
  openGraph: {
    title: "Cibaduyut Authentic Leather",
    description: "Sepatu & Sandal Kulit Asli Cibaduyut, Bandung",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="id" data-theme="cibaduyut" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <SessionProvider session={session}>
          <SessionTimeoutWrapper />
          <Header />
          <Providers>
            <main className="min-h-screen">
              {children}
            </main>
          </Providers>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
