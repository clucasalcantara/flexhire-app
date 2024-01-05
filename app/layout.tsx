import { GeistSans } from "geist/font/sans";
import Header from "@/components/Header";

import "./globals.css";

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
      <body className="bg-background text-foreground">
        <Header />
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
        <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
          <p>Copyright © 2023 Flexhire LLCT</p>
        </footer>
      </body>
    </html>
  );
}
