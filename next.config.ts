import type { NextConfig } from 'next';

import initializeBundleAnalyzer from '@next/bundle-analyzer';

// https://www.npmjs.com/package/@next/bundle-analyzer
const withBundleAnalyzer = initializeBundleAnalyzer({
    enabled: process.env.BUNDLE_ANALYZER_ENABLED === 'true'
});

// https://nextjs.org/docs/pages/api-reference/next-config-js
const nextConfig: NextConfig = {
    // Note: 'standalone' output is for Docker. Vercel uses default output.
    // Uncomment below line only for Docker deployments:
    // output: 'standalone',
    
    // Proxy API requests to backend to avoid CORS issues
    async rewrites() {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://voltherm-backend-2pw5.onrender.com';
        return [
            {
                source: '/api/:path*',
                destination: `${backendUrl}/api/:path*`,
            },
        ];
    },
    
    images: {
        // NOTE: Product images added by admin use 'unoptimized' prop
        // so they work with ANY external URL without configuring hostname here.
        // Only static/fixed images need to be configured below.
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'assets.aceternity.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: '5.imimg.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'encrypted-tbn0.gstatic.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'img.freepik.com',
                port: '',
                pathname: '/**'
            }
        ],
        // Increase timeout for slow external image sources
        minimumCacheTTL: 60,
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
    }
};

export default withBundleAnalyzer(nextConfig);
