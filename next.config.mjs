/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/photos',
  images: {
    unoptimized: true,
    domains: ['images.ctfassets.net', 'downloads.ctfassets.net']
  }
};

export default nextConfig;
