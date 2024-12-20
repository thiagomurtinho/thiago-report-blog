import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeButton } from "@/components/theme-menu"
import { GithubLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "T<R>",
  description:
    "Blog criado para compartilhar conhecimento sobre tecnologia, desenvolvimento de software e programação."
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="border-b">
            <div className="container mx-auto max-w-7xl grow p-4 sm:px-6 lg:px-8">
              <div className="flex justify-between">
                <Link href="/">
                  <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-typography sm:text-3xl sm:leading-10 md:text-4xl">
                    <span className="bg-gradient-to-r from-blue-400 to-emerald-600 bg-clip-text text-transparent">
                      Thiago <span>&lt;</span>
                      Report
                      <span>&gt;</span>
                    </span>
                  </h1>
                </Link>
                <nav>
                  <ul className="flex items-center gap-4">
                    <li>
                      <Link href="/" className="text-muted-foreground hover:text-primary">
                        Feed
                      </Link>
                    </li>

                    <li>
                      <ThemeButton />
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>

          <main className="container mx-auto max-w-7xl grow px-4 sm:px-6 lg:px-8">{children}</main>

          <footer className="mt-16 border-t">
            <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Sobre o Blog</h3>
                  <p className="text-muted-foreground">
                    Explorando o mundo do desenvolvimento web e compartilhando conhecimentos sobre
                    React, Next.js e muito mais.
                  </p>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Links Rápidos</h3>
                  <ul className="flex space-x-4">
                    <li>
                      <Link
                        href="https://linkedin.com/in/thiagomurtinho/"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <LinkedinLogo weight="bold" className="size-6" />
                        <span className="sr-only">LinkedIn</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://instagram.com/thiago.murtinho"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <InstagramLogo weight="bold" className="size-6" />
                        <span className="sr-only">Instagram</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://github.com/thiagomurtinho"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <GithubLogo weight="bold" className="size-6" />
                        <span className="sr-only">GitHub</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Inscreva-se</h3>
                  <p className="mb-4 text-muted-foreground">
                    Receba as últimas atualizações diretamente na sua caixa de entrada.
                  </p>
                  <form className="flex items-center">
                    <input
                      type="email"
                      placeholder="Seu e-mail"
                      className="grow rounded-l-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button type="submit" className="h-10 rounded-l-none">
                      Inscrever
                    </Button>
                  </form>
                </div>
              </div>
              <div className="mt-8 pt-8 text-center text-muted-foreground">
                <p>&copy; 2023 Meu Blog de Tecnologia. Todos os direitos reservados.</p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
