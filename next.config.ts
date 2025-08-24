import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  devIndicators: false,
  // Add build-time environment variable handling
  env: {
    // Set default values for build-time to prevent errors
    NEXT_PUBLIC_STACK_PROJECT_ID: process.env.NEXT_PUBLIC_STACK_PROJECT_ID || 'build-time-placeholder',
    NODE_ENV: process.env.NODE_ENV || 'production',
  },
};

export default nextConfig;
