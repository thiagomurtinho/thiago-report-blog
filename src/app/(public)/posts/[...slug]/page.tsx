import { getAllBlogSlugs, getBlogByPath } from "@/mdx.config"
import Image from "next/image"

/**
 * TODO
 * - Adicionar SEO
 * - Adicionar botão de compartilhar
 * - Adicionar botão de voltar
 * - Adicionar botão de comentar usando github issues
 * - Recuperar readingTime
 * - Recuperar pugings mdx
 * - remover o ".mdx" do path da url
 */
export const dynamicParams = false

export function generateStaticParams() {
  return getAllBlogSlugs().map(post => ({
    slug: post.path.split("/")
  }))
}

export default async function PostPage({ params }: { params: { slug: string[] } }) {
  const { content, frontmatter } = await getBlogByPath(params.slug.join("/"))

  return (
    <>
      <div className="mb-8 text-center">
        <header>
          <Image
            src={frontmatter?.cover_image ?? ""}
            width={1024}
            height={1024}
            alt={frontmatter?.title ?? ""}
            className="h-80 w-full rounded-lg object-cover transition duration-200 ease-in-out hover:brightness-110"
          />
          <section className="flex w-full items-center justify-center gap-2">
            <time dateTime={frontmatter?.created_at} className="text-xs text-typography/90">
              {new Date(frontmatter.created_at).toLocaleDateString("pt-BR", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </time>
            {" - "}
            <p className="text-xs text-typography/60">
              {/* {Math.ceil(frontmatter?.readingTime.time / (1000 * 60))} min de leitura */}
            </p>
          </section>
        </header>
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
          <span className="bg-gradient-to-r from-blue-400 to-emerald-500 bg-clip-text leading-tight text-transparent">
            {frontmatter?.title}
          </span>
        </h1>
      </div>
      {content}

      {/* <AuthorFooter /> */}
    </>
  )
}
