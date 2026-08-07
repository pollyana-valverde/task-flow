import type { Metadata } from "next";
import { Hanken_Grotesk, Space_Grotesk, Space_Mono } from "next/font/google";

import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Task Flow",
  description: "Organize times, boards e tarefas em um só lugar.",
  icons: {
     icon: "/favicon.ico",
   },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning={true} >
      <body
        className={cn(
          hankenGrotesk.variable,
          spaceMono.variable,
          spaceGrotesk.variable,
          "font-sans",
          "overflow-x-hidden"
        )}
      >
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
