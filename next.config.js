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
    serverComponentsExternalPackages: ['@node-rs/bcrypt'],
    optimizeCss: true,
  },
  serverExternalPackages: ['@node-rs/bcrypt'], // Changed from experimental
  webpack: (config) => {
    config.experiments = { 
      ...config.experiments, 
      asyncWebAssembly: true 
    };
    return config;
  },
  // Add these critical settings
  staticPageGenerationTimeout: 180,
  images: {
    unoptimized: true
  },
  // THIS IS THE KEY ADDITION:
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' }
        ]
      }
    ]
  }
};

module.exports = {
  // Remove or simplify any custom matchers
  experimental: {
    forceSwcTransforms: true, // Add this if missing
  },
  // Optional: Add build excludes
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(spec|test).(js|jsx|ts|tsx)$/,
      loader: "ignore-loader",
    });
    return config;
  },
};