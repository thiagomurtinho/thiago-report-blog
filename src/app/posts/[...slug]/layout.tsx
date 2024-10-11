import { getPost } from "@/contentlayer/utils"
import { Metadata } from "next"

type Props = {
  params: { slug: string[] }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug.join("/"))

  return {
    title: post?.title,
    description: post?.tldr
  }
}

export default function Layout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <article className="prose-headings:text-typography prose-lead:text-typography prose-p:text-typography prose-a:text-typography prose-em:text-typography prose-hr:text-typography prose prose-zinc max-w-none dark:prose-invert prose-strong:font-bold prose-img:w-full dark:prose-strong:text-white">
      {children}
    </article>
  )
}
