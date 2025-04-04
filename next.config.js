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
    serverComponentsExternalPackages: ['bcryptjs'], // Fix package name
    optimizeCss: true,
    forceSwcTransforms: true,
  },
  staticPageGenerationTimeout: 180,
  images: {
    unoptimized: true
  },
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
  },
  webpack: (config) => {
    // Combined webpack config
    config.experiments = { 
      ...config.experiments, 
      asyncWebAssembly: true 
    };
    
    // Add test file ignore rule
    config.module.rules.push({
      test: /\.(spec|test).(js|jsx|ts|tsx)$/,
      loader: "ignore-loader",
    });
    
    return config;
  },
};

module.exports = nextConfig;  // Export the proper config object