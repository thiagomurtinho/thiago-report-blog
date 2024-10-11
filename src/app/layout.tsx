import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
})

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <header className="border-b">
          <div className="container mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <Link href="/">
                <h1 className="text-typography text-xl font-extrabold md:text-2xl lg:text-3xl">
                  <span className="bg-gradient-to-r from-blue-400 to-emerald-600 bg-clip-text text-transparent">
                    Thiago <span>&lt;</span>
                    Report
                    <span>&gt;</span>
                  </span>
                </h1>
              </Link>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <Link href="/" className="text-muted-foreground hover:text-primary">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-muted-foreground hover:text-primary">
                      Artigos
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="grow">{children}</main>

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
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="text-muted-foreground hover:text-primary">
                      Sobre
                    </Link>
                  </li>
                  <li>
                    <Link href="/archive" className="text-muted-foreground hover:text-primary">
                      Arquivo
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-muted-foreground hover:text-primary">
                      Contato
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                      Política de Privacidade
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-lg font-semibold">Inscreva-se</h3>
                <p className="mb-4 text-muted-foreground">
                  Receba as últimas atualizações diretamente na sua caixa de entrada.
                </p>
                <form className="flex">
                  <input
                    type="email"
                    placeholder="Seu e-mail"
                    className="grow rounded-l-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button type="submit" className="rounded-l-none">
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
      </body>
    </html>
  )
}
