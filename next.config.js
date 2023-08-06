/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { domains: ["image.tmdb.org"] },
  compiler: {
    styledComponents: true,
  },
  redirects() {
    return [
      {
        source: "/movies",
        destination: "/",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
