"use client"
import { RouteType } from "next/dist/lib/load-custom-routes"
import NextLink, { LinkProps as NextLinkProps } from "next/link"
import { usePathname } from "next/navigation"

type LinkProps = NextLinkProps<RouteType> & {
  children: React.ReactNode
  className?: string
  "aria-disabled"?: boolean
}

export function Link(props: LinkProps) {
  const pathName = usePathname()
  return (
    <NextLink
      data-active={props.href === pathName}
      onClick={e => {
        if (props["aria-disabled"]) {
          e.preventDefault()
        }
      }}
      {...props}
    />
  )
}
