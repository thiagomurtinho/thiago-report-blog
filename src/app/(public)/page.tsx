import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import { getBlogs } from "@/mdx.config"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

/**
 * TODO
 * - Adicionar SEO completo no layout. Precisa das imagens para meta tags
 * - Adicionar paginação ou Adicionar botão de carregar mais ou Adicionar scroll infinito
 * - Melhorar CARD de acordo com blog anterior
 * - Adicionar botão de compartilhar
 * - Adicionar mais lidos, depois de ter contagem de acesso e interações
 * - Impementar inscrever-se para receber novidades por email
 * - cor do badge em ligh está muito fraca
 */

export default async function Home() {
  const posts = await getBlogs()

  return (
    <>
      <div className="w-full py-16">
        <h1 className="mb-4 text-4xl font-bold">Relatórios de tecnolgia</h1>
        <h2 className="text-xl text-muted-foreground">
          Blog criado para compartilhar conhecimento sobre tecnologia, desenvolvimento de software e
          mais.
        </h2>

        {/* <h2 className="mb-6 text-2xl font-semibold">Postagens Recentes</h2> */}
        <div className="my-4 grid grid-cols-[auto_1fr_auto] items-center pt-16 font-mono text-sm">
          <div className="rounded-md bg-secondary px-2 py-1 tracking-tighter">
            <span className="font-sans font-semibold text-typography">Recentes:</span>
          </div>
          <div className="mx-2 h-[3px] bg-secondary"></div>
        </div>
        <Separator className="my-6" />
        <div className="space-y-8">
          {posts.map(post => (
            <Card
              key={post.frontmatter.id}
              className="overflow-hidden transition-shadow duration-200 hover:shadow-lg"
            >
              <Link href={`/posts/${post.path}`} className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <Image
                    src={`${post.frontmatter.cover_image}`}
                    alt={`Imagem de capa para ${post.frontmatter.title}`}
                    width={400}
                    height={200}
                    className="h-48 w-full object-cover md:h-full"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <CardHeader className="mb-2 p-0">
                    <CardTitle className="text-xl font-semibold transition-colors duration-200 hover:text-primary">
                      {post.frontmatter.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="mb-4 line-clamp-4 text-muted-foreground">
                      {post.frontmatter.tldr}
                    </p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {post.frontmatter.tags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <footer className="flex justify-between">
                      <time
                        className="text-sm text-muted-foreground"
                        dateTime={post.frontmatter.created_at}
                      >
                        {new Date(post.frontmatter.created_at).toLocaleDateString("pt-BR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </time>
                    </footer>
                  </CardContent>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
      <div className="mt-8 flex items-center justify-center">
        <Button>Carregar mais</Button>
      </div>
    </>
  )
}
