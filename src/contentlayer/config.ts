import { defineDocumentType } from 'contentlayer/source-files'
import readingTime from 'reading-time'

/** @type {import('contentlayer/source-files').ComputedFields<{
 *   body: {
 *     raw: string
 *   }
 *   _raw: {
 *     flattenedPath: string
 *   }
 * }>} */
export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: '**/*.{mdx,md}',
  contentType: 'mdx',
  fields: {
    id: { type: 'string', required: true, isId: true },
    title: { type: 'string', required: true },
    tldr: { type: 'string', required: true },
    series: { type: 'string', required: false },
    tags: { type: 'list', of: { type: 'string' }, required: false },
    cover_image: { type: 'string', required: true },
    alias: { type: 'string', required: false },
    path: { type: 'string', required: true },
    created_at: { type: 'date', required: true },
    lang: { type: 'string', required: true },
    published: { type: 'boolean', required: false }
  },
  computedFields: {
    readingTime: {
      type: 'json',
      resolve: (doc: { body: { raw: string } }) => readingTime(doc.body.raw)
    },
    url: {
      type: 'string',
      resolve: (post: { _raw: { flattenedPath: string } }) => `/posts/${post._raw.flattenedPath}`
    }
  }
}))
