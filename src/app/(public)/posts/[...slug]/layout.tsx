import { getBlogByPath } from "@/mdx.config"
import { Metadata } from "next"
import Image from "next/image"

type Props = {
  params: { slug: string[] }
}

// TODO: Completar SEO com metadata

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { frontmatter } = await getBlogByPath(params.slug.join("/"))

  return {
    title: frontmatter?.title,
    description: frontmatter?.tldr
  }
}

export default function Layout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <article className="typography">
      {children}
      <div className="my-4 grid grid-cols-[auto_1fr_auto] items-center pt-8 font-mono text-sm">
        <div className="rounded-md bg-secondary/10 px-2 py-1 tracking-tighter">
          <span className="font-sans font-semibold text-typography">Autor:</span>
        </div>
        <div className="mx-2 h-[3px] bg-secondary/20"></div>
      </div>
      <footer className="not-prose mt-8 flex flex-col items-center justify-center sm:flex-row sm:space-x-4">
        <picture className="grid size-32 items-center justify-center">
          <Image
            src="https://avatars.githubusercontent.com/u/12580485?v=4"
            alt="Author Thiago Murtinho Avatar"
            width={500}
            height={500}
            className="rounded-full transition duration-200 ease-in-out hover:brightness-110"
            priority
          />
        </picture>

        <div className="flex h-full grow flex-col items-center justify-between sm:items-start">
          <h4 className="my-6 text-lg  font-semibold sm:my-0">Thiago Murtinho</h4>
          <p className="text-center text-typography sm:text-justify">
            Empreendedor, desenvolvedor e entusiasta de tecnologia. Adoro compartilhar conhecimento
            e aprender enquanto ajudo a comunidade de tecnologia a crescer.
          </p>
        </div>
      </footer>
    </article>
  )
}
