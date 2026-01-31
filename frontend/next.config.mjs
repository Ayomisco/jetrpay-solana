/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify is now default in Next.js 15+, no need to specify
  
  typescript: {
    ignoreBuildErrors: true, // For rapid deployment
  },
  
  images: {
    unoptimized: true, // Simplify for initial deployment
  },
  
  // Performance optimizations
  poweredByHeader: false, // Remove X-Powered-By header
  
  // Production compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'], // Keep error/warn logs
    } : false,
  },
  
  // Webpack configuration to suppress optional dependency warnings
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    // Suppress pino-pretty warning (optional dependency)
    config.ignoreWarnings = [
      { module: /node_modules\/pino/ },
    ]
    return config
  },
}

export default nextConfig
