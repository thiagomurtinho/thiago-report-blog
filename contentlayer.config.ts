import { makeSource } from "contentlayer/source-files"

import { rehypePlugins } from "./src/contentlayer/rehype.plugins"
import { remarkPlugins } from "./src/contentlayer/remark.plugins"
import { Post } from "./src/contentlayer/config"

export default makeSource({
  contentDirPath: "src/posts",
  // contentDirExclude: ["templates", ".obsidian"],
  documentTypes: [Post],
  mdx: {
    remarkPlugins: remarkPlugins,
    rehypePlugins: rehypePlugins
  }
})
