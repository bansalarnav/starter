import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/utils/context/AuthCtx";
import { getUser } from "@/utils/getUser";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Starter Project",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser("rootlayout");
  console.log("rebuilding root layout :clown:");

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider user={user}>{children}</AuthProvider>
      </body>
    </html>
  );
}
