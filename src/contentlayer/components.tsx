import { getMDXComponent } from 'next-contentlayer/hooks'
import Image, { ImageProps } from 'next/image'
import React from 'react'

export type MDXComponents = {
  [Key in keyof JSX.IntrinsicElements]?: React.ComponentType<any>
}

const Img = ({ src, alt, ...props }: { src: string; alt: string; props: ImageProps }) => {
  return (
    <figure className="w-full max-w-none">
      <Image
        src={src || ''}
        width={1024}
        height={1024}
        alt={alt}
        {...props}
        className="w-full rounded-lg object-cover transition duration-200 ease-in-out hover:brightness-110"
      />
    </figure>
  )
}

export const mdxComponents: MDXComponents = {
  img: Img
}

export function MDXRender({ content }: { content: string; components?: MDXComponents }) {
  const MDXContent = getMDXComponent(content)

  return <MDXContent components={mdxComponents} />
}
