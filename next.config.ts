import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Custom-Header, Content-Type, Authorization', 
          },
          {
            key: 'Content-Type',
            value: 'application/json'
          }
        ]
      }
    ]
  },
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
