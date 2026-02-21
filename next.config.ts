import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // Enable static optimization only in production
  trailingSlash: true,
  
  // Image optimization
  images: {
    domains:["mediadazz.com","development.mediadazz.com"],
    unoptimized: isProd, // Required for static export
    formats: ['image/webp', 'image/avif'],
  },
  
  // Compression and optimization
  compress: true,
  
  // Bundle optimization
  experimental: {
    optimizeCss: isProd,
    optimizePackageImports: ['react-icons', 'swiper'],
  },
  
  // Webpack optimization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    // Optimize bundle splitting
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        swiper: {
          test: /[\\/]node_modules[\\/]swiper[\\/]/,
          name: 'swiper',
          chunks: 'all',
        },
        icons: {
          test: /[\\/]node_modules[\\/]react-icons[\\/]/,
          name: 'icons',
          chunks: 'all',
        },
      },
    };
    
    return config;
  },
  
  // Headers for better caching (prod only)
  async headers() {
    if (!isProd) return [];
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
