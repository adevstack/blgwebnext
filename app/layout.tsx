import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import getCurrentUser from "./actions/getCurrentUser";
import { Providers } from "@/providers"; // Ensure you have the Providers component imported
import Footer from "@/components/main/Footer";

// Define metadata
export const metadata: Metadata = {
  title: "Blog Web",
  description: "This is my Assignment",
};

const inter = Inter({ subsets: ["latin"] });

// Update RootLayout to match the provided structure
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-inherit text-foreground overflow-y-scroll overflow-x-hidden`}>
        <Providers>
          <Navbar currentUser={currentUser} />
          <main>{children}</main>
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
