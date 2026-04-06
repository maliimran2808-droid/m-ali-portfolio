import type { Metadata } from "next";
import { Inter, Montserrat, Poppins, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins" 
});
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
export const metadata: Metadata = {
  title: "Muhammad Ali | Digital Craftsman",
  description: "I don't just build websites. I engineer experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
   <body className={`${inter.variable} ${montserrat.variable} ${poppins.variable} ${manrope.variable} font-sans`}>
        <Preloader />
        <CustomCursor />
        <SmoothScroll>
          <Header />

          {children}
        <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}