/** @type {import('next').NextConfig} */

const basePath = process.env.GITHUB_PAGES === '1' ? '/cerne-landpage' : undefined

const nextConfig = {
  output: 'export',
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath ?? '',
  },
}

export default nextConfig
