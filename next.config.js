/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'res.cloudinary.com', 
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'beshop-demo.vercel.app',
      'fakestoreapi.com'
    ]
  }
}

module.exports = nextConfig
