import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Allow reading files from the parent wiki-copro repo
  serverExternalPackages: ['gray-matter'],
}

export default nextConfig
