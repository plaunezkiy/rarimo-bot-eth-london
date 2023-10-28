import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rarimo Discord Bot",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextAuthSessionProvider>
        <body className={inter.className}>
          <div className="p-4">{children}</div>
        </body>
      </NextAuthSessionProvider>
    </html>
  );
}
