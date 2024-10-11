import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"

const recentPosts = [
  {
    id: 1,
    title: "Introdução ao React Hooks",
    date: "2023-10-15",
    image: "/images/placeholder.svg",
    summary:
      "Descubra como os React Hooks simplificam o gerenciamento de estado e ciclo de vida em componentes funcionais."
  },
  {
    id: 2,
    title: "Otimizando performance em aplicações Next.js",
    date: "2023-10-10",
    image: "/images/placeholder.svg",
    summary:
      "Aprenda técnicas avançadas para melhorar o desempenho de suas aplicações Next.js e oferecer uma experiência mais rápida aos usuários."
  },
  {
    id: 3,
    title: "Dicas para melhorar a acessibilidade web",
    date: "2023-10-05",
    image: "/images/placeholder.svg",
    summary:
      "Explore práticas essenciais de acessibilidade para tornar seus sites mais inclusivos e usáveis para todos os usuários."
  },
  {
    id: 4,
    title: "Gerenciamento de estado com Redux Toolkit",
    date: "2023-09-30",
    image: "/images/placeholder.svg",
    summary:
      "Domine o Redux Toolkit e simplifique o gerenciamento de estado global em suas aplicações React."
  },
  {
    id: 5,
    title: "Criando layouts responsivos com Tailwind CSS",
    date: "2023-09-25",
    image: "/images/placeholder.svg",
    summary:
      "Aprenda a criar interfaces responsivas e elegantes rapidamente usando as classes utilitárias do Tailwind CSS."
  }
]

export default function Home() {
  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold">Meu Blog de Tecnologia</h1>
          <p className="text-xl text-muted-foreground">
            Explorando o mundo do desenvolvimento web e compartilhando conhecimentos sobre React,
            Next.js e muito mais.
          </p>
        </div>

        <h2 className="mb-6 text-2xl font-semibold">Postagens Recentes</h2>
        <Separator className="my-6" />
        <div className="space-y-8">
          {recentPosts.map(post => (
            <Card
              key={post.id}
              className="overflow-hidden transition-shadow duration-200 hover:shadow-lg"
            >
              <Link href={`/post/${post.id}`} className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <Image
                    src={post.image}
                    alt={`Imagem de capa para ${post.title}`}
                    width={400}
                    height={200}
                    className="h-48 w-full object-cover md:h-full"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <CardHeader className="mb-2 p-0">
                    <CardTitle className="text-xl font-semibold transition-colors duration-200 hover:text-primary">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="mb-4 text-muted-foreground">{post.summary}</p>
                    <time className="text-sm text-muted-foreground" dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("pt-BR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </time>
                  </CardContent>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
