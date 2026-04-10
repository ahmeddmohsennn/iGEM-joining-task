/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Change 'iGEM-joining-task' to your repository name
  basePath: '/iGEM-joining-task', 
  assetPrefix: '/iGEM-joining-task',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  devIndicators: {
    buildActivity: false,
  },
}

export default nextConfig
