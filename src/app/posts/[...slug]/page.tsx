import Image from "next/image"
import { MDXRender } from "@/contentlayer/components"
import { allPosts } from "contentlayer/generated"
import { getPost } from "@/contentlayer/utils"

export function generateStaticParams() {
  return allPosts.map(post => ({ slug: post._raw.flattenedPath.split("/") }))
}

export default async function Page({
  params
}: {
  params: { slug: string[] }
}): Promise<JSX.Element> {
  const post = await getPost(params.slug.join("/"))

  return (
    <>
      <div className="mb-8 text-center">
        <header>
          <Image
            src={post?.cover_image ?? ""}
            width={1024}
            height={1024}
            alt={post?.title ?? ""}
            className="h-80 w-full rounded-lg object-cover transition duration-200 ease-in-out hover:brightness-110"
          />
          <section className="flex w-full items-center justify-center gap-2">
            <time dateTime={post?.created_at} className="text-typography/90 text-xs">
              {new Date(post!.created_at).toLocaleDateString("pt-BR", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </time>
            {" - "}
            <p className="text-typography/60 text-xs ">
              {Math.ceil(post?.readingTime.time / (1000 * 60))} min de leitura
            </p>
          </section>
        </header>
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
          <span className="bg-gradient-to-r from-blue-400 to-emerald-500 bg-clip-text leading-tight text-transparent">
            {post?.title}
          </span>
        </h1>
      </div>
      <MDXRender content={post!.body.code} />

      {/* <AuthorFooter /> */}
    </>
  )
}
