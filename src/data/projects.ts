export interface Project {
  name: string
  stars: number
  forks?: number
  tech: string
  desc: string
  url?: string
}

export const projects: Project[] = [
  {
    name: 'btc-connect',
    stars: 18,
    forks: 7,
    tech: 'TypeScript',
    desc: 'Bitcoin wallet connector for Unisat & OKX wallets',
    url: 'https://github.com/IceHugh/btc-connect'
  },
  {
    name: 'ipfs-free',
    stars: 1,
    forks: 0,
    tech: 'JavaScript',
    desc: '跨平台 IPFS 上传 SDK 聚合，支持 Infura、Pinata 等多个平台',
    url: 'https://github.com/IceHugh/ipfs-free'
  },
  {
    name: 'zincsearch-node',
    stars: 4,
    forks: 2,
    tech: 'TypeScript',
    desc: 'ZincSearch 的 Node.js SDK，TypeScript 实现，支持 Promise',
    url: 'https://github.com/IceHugh/zincsearch-node'
  },
  {
    name: 'strapi-provider-upload-ipfs-free',
    stars: 0,
    forks: 0,
    tech: 'JavaScript',
    desc: 'Strapi 的 IPFS 免费上传 provider 插件',
    url: 'https://github.com/IceHugh/strapi-provider-upload-ipfs-free'
  },
  {
    name: 'web3-learning',
    stars: 1,
    forks: 1,
    tech: 'Markdown',
    desc: 'Web3 前端开发学习路线和资源整理',
    url: 'https://github.com/IceHugh/web3-learning'
  },
  {
    name: 'medusa-file-aliyun',
    stars: 0,
    forks: 0,
    tech: 'JavaScript',
    desc: 'Medusa 的阿里云 OSS 文件存储插件',
    url: 'https://github.com/IceHugh/medusa-file-aliyun'
  },
  {
    name: 'unisat-api',
    stars: 0,
    forks: 4,
    tech: 'TypeScript',
    desc: 'Unisat Api Client'
  },
  {
    name: 'smart-rename',
    stars: 0,
    tech: 'TypeScript',
    desc: 'VSCode AI 重命名扩展'
  }
]