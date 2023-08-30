/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AUTH0_BASE_URL: process.env.PRODUCTION_URL || process.env.VERCEL_URL,
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  },
}

module.exports = nextConfig
