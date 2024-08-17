import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";
import { AuthProvider } from "./context/AuthProvider";
import { DM_Sans } from '@next/font/google';
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });
export const runtime = "edge";

const dmSans = DM_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: "Punned",
  description: "A place to share puns",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <Toaster richColors />
        <AuthProvider>
          <AppShell>
            {children}
          </AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
