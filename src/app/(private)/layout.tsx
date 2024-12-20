import type { Metadata } from "next"
import "../globals.css"
import {
  Bell,
  UserCircle,
  House,
  Books,
  ChartLine,
  List,
  ChatTeardropDots,
  Rocket,
  Scroll,
  MagnifyingGlass
} from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link } from "@/components/link"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Next.js",
  description: "Generated by Next.js"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col antialiased`}>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                  <Rocket className="size-6" />
                  <span className="">Thiago Report</span>
                </Link>
                <Button variant="outline" size="icon" className="ml-auto size-8">
                  <Bell weight="bold" className="size-4" />
                  <span className="sr-only">Toggle notifications</span>
                </Button>
              </div>
              <div className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                  <Link
                    href="/blog-admin"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary aria-[disabled=true]:cursor-default aria-[disabled=true]:text-primary/50 data-[active=true]:pointer-events-none data-[active=true]:bg-muted"
                  >
                    <House weight="bold" className="size-4" />
                    Dashboard
                  </Link>

                  <Link
                    href="/blog-admin/collections"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary aria-[disabled=true]:cursor-default aria-[disabled=true]:text-primary/50 data-[active=true]:pointer-events-none data-[active=true]:bg-muted"
                  >
                    <Books weight="bold" className="size-4" />
                    Collections
                  </Link>
                  <Link
                    href="/blog-admin/posts"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary aria-[disabled=true]:cursor-default aria-[disabled=true]:text-primary/50 data-[active=true]:pointer-events-none data-[active=true]:bg-muted"
                  >
                    <Scroll weight="bold" className="size-4" />
                    Posts
                  </Link>
                  <Link
                    href="/blog-admin/analytics"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary aria-[disabled=true]:cursor-default aria-[disabled=true]:text-primary/50 data-[active=true]:pointer-events-none data-[active=true]:bg-muted"
                    aria-disabled
                  >
                    <ChartLine weight="bold" className="size-4" />
                    Analytics
                  </Link>
                  <Link
                    href="/blog-admin/comments"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary aria-[disabled=true]:cursor-default aria-[disabled=true]:text-primary/50 data-[active=true]:pointer-events-none data-[active=true]:bg-muted"
                    aria-disabled
                  >
                    <ChatTeardropDots weight="bold" className="size-4" />
                    Comments
                    <Badge className="ml-auto flex size-6 shrink-0 items-center justify-center rounded-full">
                      6
                    </Badge>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                    <List weight="bold" className="size-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                  <nav className="grid gap-2 text-lg font-medium">
                    <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
                      <Rocket className="size-6" />
                      <span className="sr-only">Thiago Report</span>
                    </Link>
                    <Link
                      href="/blog-admin"
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-primary hover:text-foreground aria-[disabled=true]:cursor-default aria-[disabled=true]:text-primary/50 data-[active=true]:pointer-events-none data-[active=true]:bg-muted"
                    >
                      <House weight="bold" className="size-5" />
                      Dashboard
                    </Link>
                    <Link
                      href="/blog-admin/collections"
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-primary hover:text-foreground aria-[disabled=true]:cursor-default aria-[disabled=true]:text-primary/50 data-[active=true]:pointer-events-none data-[active=true]:bg-muted"
                    >
                      <Books weight="bold" className="size-5" />
                      Collections
                    </Link>
                    <Link
                      href="/blog-admin/posts"
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-primary hover:text-foreground aria-[disabled=true]:cursor-default aria-[disabled=true]:text-primary/50 data-[active=true]:pointer-events-none data-[active=true]:bg-muted"
                    >
                      <Scroll weight="bold" className="size-5" />
                      Posts
                    </Link>
                    <Link
                      href="/blog-admin/analytics"
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-primary hover:text-foreground aria-[disabled=true]:cursor-default aria-[disabled=true]:text-primary/50 data-[active=true]:pointer-events-none data-[active=true]:bg-muted"
                      aria-disabled
                    >
                      <ChartLine weight="bold" className="size-5" />
                      Analytics
                    </Link>
                    <Link
                      href="/blog-admin/comments"
                      className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-primary hover:text-foreground aria-[disabled=true]:cursor-default aria-[disabled=true]:text-primary/50 data-[active=true]:pointer-events-none data-[active=true]:bg-muted"
                      aria-disabled
                    >
                      <ChatTeardropDots weight="bold" className="size-5" />
                      Comments
                      <Badge className="ml-auto flex size-6 shrink-0 items-center justify-center rounded-full">
                        6
                      </Badge>
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
              <div className="w-full flex-1">
                <form>
                  <div className="relative">
                    <MagnifyingGlass className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                    <Input
                      type="MagnifyingGlass"
                      placeholder="MagnifyingGlass products..."
                      className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                    />
                  </div>
                </form>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="rounded-full">
                    <UserCircle className="size-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
