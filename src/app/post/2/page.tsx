import { compileMDX } from "next-mdx-remote/rsc"
import React from "react"

export default async function Page() {
  // Optionally provide a type for your frontmatter object
  const { content, frontmatter } = await compileMDX<{ title: string }>({
    source: `---
title: RSC Frontmatter Example
---
# Hello World
This is from Server Components!
`,
    options: { parseFrontmatter: true }
  })

  return (
    <>
      <h1>{frontmatter.title}</h1>
      {content}
    </>
  )
}
