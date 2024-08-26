import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BlogSphere",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
        {children}
        </AuthProvider>
        </body>
    </html>
  );
}
