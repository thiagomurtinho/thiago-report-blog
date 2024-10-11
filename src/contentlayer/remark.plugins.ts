import { MarkdownOptions } from 'contentlayer/core'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'

export const remarkPlugins: MarkdownOptions['remarkPlugins'] = [remarkGfm, remarkToc]
