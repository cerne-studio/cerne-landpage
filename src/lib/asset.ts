/** Prefixa caminhos de /public com o basePath (GitHub Pages serve em subpasta). */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`
