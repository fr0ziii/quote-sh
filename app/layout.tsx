import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import "./globals.css";

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
            <div className="max-h-screen lg:min-h-screen w-full flex flex-col items-center">
              <div className="md:grow md:w-full md:p-8">
                {children}
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
