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
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**"
      }
    ]
  }
}

export default nextConfig
