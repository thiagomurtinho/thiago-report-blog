import fs from "fs"
import path from "path"
import { compileMDX } from "next-mdx-remote/rsc"

// Define o tipo Frontmatter
type Frontmatter = {
  id: string
  title: string
  tldr: string
  series: string
  tags: string[]
  cover_image: string
  alias: string
  path: string
  created_at: string
  lang: string
  published: boolean
}

const contentDir = path.join(process.cwd(), "src/app/(public)/posts/_mdx-content")

// Função recursiva para buscar todos os arquivos MDX em uma estrutura de pastas
function getAllFilesRecursively(directory: string): string[] {
  let results: string[] = []
  const list = fs.readdirSync(directory)

  list.forEach(file => {
    const filePath = path.join(directory, file)
    const stat = fs.statSync(filePath)

    if (stat && stat.isDirectory()) {
      // Se for diretório, chama a função recursivamente
      results = results.concat(getAllFilesRecursively(filePath))
    } else if (filePath.endsWith(".mdx")) {
      // Se for um arquivo MDX, adiciona ao resultado
      results.push(filePath)
    }
  })

  return results
}

// Função para buscar o blog por caminho
export async function getBlogByPath(blogPath: string) {
  const filePath = path.join(contentDir, blogPath)

  if (!fs.existsSync(filePath)) {
    throw new Error(`Arquivo com o caminho "${blogPath}" não encontrado.`)
  }

  const fileContent = fs.readFileSync(filePath, "utf8")
  const { frontmatter, content } = await compileMDX<Frontmatter>({
    source: fileContent,
    options: { parseFrontmatter: true }
  })

  const relativePath = filePath.replace(contentDir, "").replace(/^[\/]/, "")

  return {
    frontmatter,
    content,
    slug: path.parse(filePath).name,
    path: relativePath
  }
}

// Função para buscar blogs com paginação
export async function getBlogs(page: number = 1, limit: number = 10) {
  const allFiles = getAllFilesRecursively(contentDir)
  const paginatedFiles = allFiles.slice((page - 1) * limit, page * limit)

  const blogs = await Promise.all(
    paginatedFiles.map(
      async file => await getBlogByPath(file.replace(contentDir, "").replace(/^[\/]/, ""))
    )
  )

  return blogs
}

// Função para obter todos os slugs dos blogs
export function getAllBlogSlugs() {
  const allFiles = getAllFilesRecursively(contentDir)
  const slugs = allFiles.map(file => {
    const relativePath = file.replace(contentDir, "").replace(/^[\/]/, "")
    return {
      slug: path.parse(file).name,
      path: relativePath
    }
  })
  return slugs
}

// Função para buscar a quantidade total de blogs
export function getTotalBlogs() {
  const allFiles = getAllFilesRecursively(contentDir)
  return allFiles.length
}
