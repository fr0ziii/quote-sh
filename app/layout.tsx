import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { Github, Twitter, X } from "lucide-react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Quote/sh",
  description: "A quote generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex flex-col items-center">
            <div className="min-h-screen w-full flex flex-col items-center">
              <div className="grow w-full p-8">
                {children} <SpeedInsights />
              </div>

              <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-sm gap-4 py-8">
                <p>
                  Made by{" "}
                  <a
                    href="https://github.com/fr0zii"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                  >
                    David Iglesias (version 0.1)
                  </a>
                </p>
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
