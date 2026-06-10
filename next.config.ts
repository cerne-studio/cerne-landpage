import type { NextConfig } from 'next'

// GitHub Pages serve o site em /cerne-landpage — o build do Pages usa
// GITHUB_PAGES=1 para prefixar rotas e assets. Build local fica na raiz.
const basePath = process.env.GITHUB_PAGES === '1' ? '/cerne-landpage' : undefined

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  env: {
    // Para referências manuais a /public (ex.: <video src>) que o basePath não reescreve
    NEXT_PUBLIC_BASE_PATH: basePath ?? '',
  },
}

export default nextConfig
