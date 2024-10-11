import { withContentlayer } from "next-contentlayer"
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "g-cvtvinpuzol.vusercontent.net",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "bozxmjnovrpwutckazhx.supabase.co",
        port: "",
        pathname: "/**"
      }
    ]
  }
}

export default withContentlayer(nextConfig)
