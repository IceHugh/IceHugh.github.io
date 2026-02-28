export interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  author?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'profile'
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  twitterSite?: string
  twitterCreator?: string
  canonicalUrl?: string
  locale?: string
  siteName?: string
  jsonLd?: Record<string, unknown>
}

export const DEFAULT_SEO: Required<SEOProps> = {
  title: 'IceHub - Web3 Developer & Open Source Contributor',
  description: 'Web3 Developer | GitHub Arctic Code Vault Contributor | 专注 Bitcoin 钱包连接与去中心化存储方案',
  keywords: ['Web3', 'Bitcoin', 'React', 'TypeScript', 'Developer', 'Open Source', 'Arctic Code Vault'],
  author: 'IceHub',
  ogImage: '/og-image.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterSite: '@IceHub',
  twitterCreator: '@IceHub',
  locale: 'zh_CN',
  siteName: 'IceHub',
  canonicalUrl: 'https://icehugh.github.io',
  jsonLd: {},
}

export function generateMetaTags(props: SEOProps): string {
  const seo = { ...DEFAULT_SEO, ...props }
  const siteUrl = 'https://icehugh.github.io'
  const imageUrl = seo.ogImage ? `${siteUrl}${seo.ogImage}` : `${siteUrl}/og-image.png`
  const canonical = seo.canonicalUrl || siteUrl

  const metaTags = [
    // Basic Meta Tags
    `<title>${seo.title}</title>`,
    `<meta name="description" content="${seo.description}" />`,
    `<meta name="keywords" content="${seo.keywords?.join(', ') || ''}">`,
    `<meta name="author" content="${seo.author}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<link rel="canonical" href="${canonical}" />`,

    // Open Graph
    `<meta property="og:title" content="${seo.title}" />`,
    `<meta property="og:description" content="${seo.description}" />`,
    `<meta property="og:type" content="${seo.ogType}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${imageUrl}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="${seo.locale}" />`,
    `<meta property="og:site_name" content="${seo.siteName}" />`,

    // Twitter Card
    `<meta name="twitter:card" content="${seo.twitterCard}" />`,
    `<meta name="twitter:title" content="${seo.title}" />`,
    `<meta name="twitter:description" content="${seo.description}" />`,
    `<meta name="twitter:image" content="${imageUrl}" />`,
    seo.twitterSite && `<meta name="twitter:site" content="${seo.twitterSite}" />`,
    seo.twitterCreator && `<meta name="twitter:creator" content="${seo.twitterCreator}" />`,

    // JSON-LD
    seo.jsonLd && `<script type="application/ld+json">${JSON.stringify(seo.jsonLd)}</script>`,
  ].filter(Boolean)

  return metaTags.join('\n    ')
}

export function generatePersonJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'IceHub',
    url: 'https://icehugh.github.io',
    jobTitle: 'Web3 Developer',
    description: 'Web3 Developer | GitHub Arctic Code Vault Contributor',
    sameAs: [
      'https://github.com/IceHub',
      'https://twitter.com/IceHub',
    ],
    knowsAbout: [
      'Web3',
      'Bitcoin',
      'React',
      'TypeScript',
      'Decentralized Storage',
    ],
  }
}

export function generateWebsiteJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'IceHub',
    url: 'https://icehugh.github.io',
    description: 'Web3 Developer Portfolio - IceHub',
    publisher: {
      '@type': 'Person',
      name: 'IceHub',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://github.com/IceHub?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function useSEO(props: Partial<SEOProps> = {}): Required<SEOProps> {
  const seo: Required<SEOProps> = { ...DEFAULT_SEO, ...props } as Required<SEOProps>
  
  // Set document title
  if (typeof document !== 'undefined') {
    document.title = seo.title
  }

  return seo
}