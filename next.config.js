/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['bcryptjs'],
  },
  // Add these critical settings
  staticPageGenerationTimeout: 180,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig