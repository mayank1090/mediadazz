import type { Metadata } from "next";
import { Geist, Geist_Mono , Epilogue} from "next/font/google";
import "./globals.css";
import Satoshi from "next/font/local";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'leaflet/dist/leaflet.css';
import SidebarMegaMenu from "@/components/navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: false,
});

const epilogue = Epilogue({
   subsets:["latin"],
   variable:"--font-epilogue",
   display: 'swap',
   preload: false,
})

const satoshi = Satoshi({
  src: [
    {
      path: '../../public/fonts/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-Variable.woff2',
      weight: '300 900',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi_Complete/Fonts/WEB/fonts/Satoshi-VariableItalic.woff2',
      weight: '300 900',
      style: 'italic',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
  preload: true,
});


export const metadata: Metadata = {
  title: "MediaDAZZ - Advertise Anywhere From One Place",
  description: "Simplify campaigns, reach more customers, and manage all your media in a single platform. Plan, book, and optimize effortlessly with real-time insights.",
  keywords: ["advertising", "media planning", "campaign management", "outdoor advertising", "digital marketing"],
  authors: [{ name: "MediaDAZZ" }],
  creator: "MediaDAZZ",
  publisher: "MediaDAZZ",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mediadazz.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "MediaDAZZ - Advertise Anywhere From One Place",
    description: "Simplify campaigns, reach more customers, and manage all your media in a single platform.",
    url: 'https://mediadazz.com',
    siteName: 'MediaDAZZ',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "MediaDAZZ - Advertise Anywhere From One Place",
    description: "Simplify campaigns, reach more customers, and manage all your media in a single platform.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${epilogue.variable} ${satoshi.variable} antialiased`}
      >
        <SidebarMegaMenu
          loginHref="/login"
          cartHref="/cart"
        />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
