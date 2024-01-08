import { GeistSans } from "geist/font/sans";
import Header from "@/components/Header";
import { ToastContainer } from 'react-toastify';

import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "FLEXHIRE",
  description: "The fastest way to land your new tech job",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="flex flex-col bg-background text-foreground">
        <div className="w-full">
          <Header />
        </div>
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
        <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
          <p>Copyright © 2023 Flexhire LLCT</p>
        </footer>
        <ToastContainer theme="dark" hideProgressBar />
      </body>
    </html>
  );
}
