/** @type {import('next').NextConfig} */
import createMDX from "@next/mdx"
// import { rehypePlugins } from "./src/contentlayer/rehype.plugins"
// import { remarkPlugins } from "./src/contentlayer/remark.plugins"

import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import rehypeCodeTitles from "rehype-code-titles"
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis"
import rehypeAutolinkHeadings from "rehype-autolink-headings"

import { visit } from "unist-util-visit"
import remarkGfm from "remark-gfm"
import remarkToc from "remark-toc"
import remarkFrontmatter from "remark-frontmatter"

export const remarkPlugins = [
  remarkGfm,
  remarkToc,
  remarkFrontmatter, // Detecta o frontmatter
  removeFrontmatter // Remove o frontmatter
]

// Função customizada para remover o frontmatter
function removeFrontmatter() {
  return tree => {
    visit(tree, "yaml", (node, index, parent) => {
      parent.children.splice(index, 1) // Remove o frontmatter do tipo 'yaml'
    })
  }
}

function replaceBackLinks() {
  return tree =>
    visit(tree, "text", node => {
      if (/\[\[.*?\]\]/.test(node.value)) {
        node.value = node.value.replace(/\[\[(.*?)\]\]/g, "($1)")
      }
    })
}

function removeTitle() {
  return tree =>
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName === "h1") {
        parent.children.splice(index, 1)
      }
    })
}

function removeFooter() {
  let foundLastDivider = false

  return tree => {
    visit(
      tree,
      "element",
      (node, index, parent) => {
        if (index !== null && !foundLastDivider && node.tagName === "hr") {
          const siblingsAfterDivider = parent.children.slice(index + 1)
          siblingsAfterDivider.forEach(sibling => {
            const siblingIndex = parent.children.indexOf(sibling)
            if (siblingIndex !== -1) {
              parent.children.splice(siblingIndex, 1)
            }
          })
          foundLastDivider = true
          node.tagName = "span"
        }
      },
      true /* reverse traversal */
    )

    return tree
  }
}

function removeCoverImage() {
  let isFirstImage = true

  return tree =>
    visit(tree, "element", (node, index, parent) => {
      if (
        node.tagName === "p" &&
        isFirstImage &&
        node.children.length === 1 &&
        node.children[0].tagName === "img"
      ) {
        isFirstImage = false
        parent.children.splice(index, 1)
      }
    })
}

function highlightTextInLine() {
  return tree =>
    visit(tree, "text", (node, index, parent) => {
      const text = node.value
      const regex = /==(.+?)==/g

      let match
      let lastIndex = 0
      const newChildren = []

      while ((match = regex.exec(text))) {
        const [highlightedText] = match

        if (lastIndex !== match.index) {
          newChildren.push({ type: "text", value: text.slice(lastIndex, match.index) })
        }

        newChildren.push({
          type: "element",
          tagName: "mark",
          properties: {
            className: ["text-mark"]
          },
          children: [{ type: "text", value: highlightedText }]
        })

        lastIndex = regex.lastIndex
      }

      if (lastIndex !== text.length) {
        newChildren.push({ type: "text", value: text.slice(lastIndex) })
      }

      parent.children.splice(index, 1, ...newChildren)
    })
}

const rehypePrettyCodeOptions = {
  theme: "one-dark-pro",
  highlightInline: true,
  inlineCodeStyle: "one-dark-pro",
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and allow empty
    // lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }]
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("line--highlighted")
  },
  onVisitHighlightedWord(node, id) {
    node.properties.className = ["word--highlighted"]

    if (id) {
      const backgroundColor = {
        v: "rgb(196 42 94 / 59%)",
        s: "rgb(0 103 163 / 56%)",
        i: "rgb(100 50 255 / 35%)"
      }[id]

      const color = {
        v: "rgb(255 225 225 / 100%)",
        s: "rgb(175 255 255 / 100%)",
        i: "rgb(225 200 255 / 100%)"
      }[id]

      if (node.properties["data-rehype-pretty-code-wrapper"]) {
        node.children.forEach(childNode => {
          childNode.properties.style = ""
        })
      }

      node.properties.style = `background-color: ${backgroundColor}; color: ${color};`
    }
  }
}

// const rehypeAutolinkHeadingsOptions = {
//   behavior: "append",
//   properties: {
//     class: "autolink-header",
//     ariaHidden: true,
//     tabIndex: -1
//   },
//   content: [
//     h("span.visually-hidden", " permalink"),
//     s(
//       "svg.autolink-svg",
//       {
//         xmlns: "http://www.w3.org/2000/svg",
//         width: 18,
//         height: 18,
//         fill: "currentColor",
//         viewBox: "0 0 24 24"
//       },
//       s("path", {
//         d: "M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992 5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242 6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985 3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005 3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201 13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995 2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0 0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836 19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997 0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632 1.563 1 1 0 0 0 1.602-1.198z"
//       })
//     )
//   ]
// }

export const rehypePlugins = [
  highlightTextInLine,
  removeTitle,
  removeCoverImage,
  removeFooter,
  replaceBackLinks,
  rehypeSlug,
  rehypeCodeTitles,
  [rehypePrettyCode, rehypePrettyCodeOptions],
  rehypeAccessibleEmojis,
  [rehypeAutolinkHeadings]
]

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: remarkPlugins,
    rehypePlugins: rehypePlugins
  }
})

// =====

const nextConfig = {
  // logging: {
  //   fetches: {
  //     fullUrl: true
  //   }
  // },
  pageExtensions: ["mdx", "md", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "g-cvtvinpuzol.vusercontent.net",
        port: "",
        pathname: "/**"
      }
    ]
  },
  transpilePackages: ["next-mdx-remote"],
  // experimental: {
  //   typedRoutes: true,
  //   mdxRs: true,
  //   turbo: {
  //     resolveExtensions: [".mdx", ".md", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"]
  //   }
  // },

  webpack: (config, { dev, isServer }) => {
    if (isServer) {
      config.plugins.push({
        apply: compiler => {
          // Exibe log antes do build
          compiler.hooks.run.tap("RunPlugin", () => {
            console.log("🚀 Build iniciado...")
          })

          // Após salvar arquivo (modo desenvolvimento)
          compiler.hooks.afterEmit.tap("AfterEmitPlugin", () => {
            console.log("🟢 Arquivo salvo...")
          })
        }
      })
    }

    if (dev && isServer) {
      config.plugins.push({
        apply: compiler => {
          // Hooks síncronos
          compiler.hooks.environment.tap("EnvironmentPlugin", () => {
            console.log("🟡 Ambiente inicializado (environment).")
          })

          compiler.hooks.beforeRun.tap("BeforeRunPlugin", () => {
            console.log("🚀 Antes do início do build (beforeRun).")
          })

          compiler.hooks.run.tap("RunPlugin", () => {
            console.log("🚀 Processo de build iniciado (run).")
          })

          compiler.hooks.beforeCompile.tap("BeforeCompilePlugin", () => {
            console.log("⚙️ Antes da compilação (beforeCompile).")
          })

          compiler.hooks.compile.tap("CompilePlugin", () => {
            console.log("⚙️ Compilação iniciada (compile).")
          })

          compiler.hooks.make.tap("MakePlugin", () => {
            console.log("⚙️ Iniciando o processo make, compilando módulos (make).")
          })

          compiler.hooks.emit.tap("EmitPlugin", compilation => {
            console.log("📤 Emitindo arquivos (emit).")
          })

          compiler.hooks.afterEmit.tap("AfterEmitPlugin", () => {
            console.log("📤 Após emissão dos arquivos (afterEmit).")
          })

          compiler.hooks.done.tap("DonePlugin", () => {
            console.log("✅ Processo de build concluído (done).")
          })

          // Hooks assíncronos
          compiler.hooks.beforeCompile.tapAsync("BeforeCompileAsyncPlugin", (params, callback) => {
            console.log("⚙️ Antes da compilação - modo assíncrono (beforeCompile).")
            callback()
          })

          compiler.hooks.emit.tapAsync("EmitAsyncPlugin", (compilation, callback) => {
            console.log("📤 Emitindo arquivos - modo assíncrono (emit).")
            callback()
          })

          compiler.hooks.done.tapAsync("DoneAsyncPlugin", (stats, callback) => {
            console.log("✅ Processo de build concluído - modo assíncrono (done).")
            callback()
          })
        }
      })
    }
    return config
  }
}

// export default withMDX(nextConfig)
export default nextConfig
