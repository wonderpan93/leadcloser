/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add these new settings
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['bcryptjs']
  }
}

module.exports = nextConfig