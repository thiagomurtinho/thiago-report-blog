import { MarkdownOptions } from "contentlayer/core"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import rehypeCodeTitles from "rehype-code-titles"
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis"
import rehypeAutolinkHeadings from "rehype-autolink-headings"

import { visit } from "unist-util-visit"

import { h, s } from "hastscript"

function replaceBackLinks() {
  return (tree: any) =>
    visit(tree, "text", (node: any) => {
      if (/\[\[.*?\]\]/.test(node.value)) {
        node.value = node.value.replace(/\[\[(.*?)\]\]/g, "($1)")
      }
    })
}

function removeTitle() {
  return (tree: any) =>
    visit(tree, "element", (node: any, index: any, parent: any) => {
      if (node.tagName === "h1") {
        parent.children.splice(index, 1)
      }
    })
}

function removeFooter() {
  let foundLastDivider = false

  return (tree: any) => {
    visit(
      tree,
      "element",
      (node: any, index: number | null, parent: any) => {
        if (index !== null && !foundLastDivider && node.tagName === "hr") {
          const siblingsAfterDivider = parent.children.slice(index + 1)
          siblingsAfterDivider.forEach((sibling: any) => {
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

  return (tree: any) =>
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
  return (tree: any) =>
    visit(tree, "text", (node: any, index: number | null, parent: any) => {
      const text = node.value
      const regex = /==(.+?)==/g

      let match
      let lastIndex = 0
      const newChildren = []

      while ((match = regex.exec(text))) {
        const [fullMatch, highlightedText] = match

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
  onVisitLine(node: any) {
    // Prevent lines from collapsing in `display: grid` mode, and allow empty
    // lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }]
    }
  },
  onVisitHighlightedLine(node: any) {
    node.properties.className.push("line--highlighted")
  },
  onVisitHighlightedWord(node: any, id: "v" | "s" | "i") {
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
        node.children.forEach((childNode: any) => {
          childNode.properties.style = ""
        })
      }

      node.properties.style = `background-color: ${backgroundColor}; color: ${color};`
    }
  }
}

const rehypeAutolinkHeadingsOptions = {
  behavior: "append",
  properties: {
    class: "autolink-header",
    ariaHidden: true,
    tabIndex: -1
  },
  content: [
    //https://daily-dev-tips.com/posts/modifying-rehype-autolink-headings/
    h("span.visually-hidden", " permalink"),
    s(
      "svg.autolink-svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: 18,
        height: 18,
        fill: "currentColor",
        viewBox: "0 0 24 24"
      },
      s("path", {
        d: "M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992 5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242 6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985 3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005 3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201 13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995 2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0 0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836 19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997 0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632 1.563 1 1 0 0 0 1.602-1.198z"
      })
    )
  ]
}

export const rehypePlugins: MarkdownOptions["rehypePlugins"] = [
  highlightTextInLine,
  removeTitle,
  removeCoverImage,
  removeFooter,
  replaceBackLinks,
  rehypeSlug,
  rehypeCodeTitles,
  [rehypePrettyCode, rehypePrettyCodeOptions],
  rehypeAccessibleEmojis,
  [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions]
]
