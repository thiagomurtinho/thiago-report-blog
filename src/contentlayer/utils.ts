import { allPosts } from 'contentlayer/generated'

export async function getPost(slug: string) {
  return allPosts.find(post => {
    return post._raw.flattenedPath === slug
  })
}

export async function getRoutes() {
  return allPosts.map(post => ({ slug: post._raw.flattenedPath.split('/') }))
}
