/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
  // Add domains for image optimization
  images: {
    domains: ['places.googleapis.com', 'maps.googleapis.com'],
  },
}

export default nextConfig
