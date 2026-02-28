import { motion } from 'framer-motion'
import type { ReactNode } from 'react'



// ============================================================================
// Types
// ============================================================================

export type SocialPlatform = 
  | 'github' 
  | 'twitter' 
  | 'linkedin' 
  | 'email' 
  | 'website' 
  | 'youtube' 
  | 'discord' 
  | 'telegram'
  | 'instagram'
  | 'medium'
  | 'dribbble'
  | 'codepen'
  | 'stackoverflow'
  | 'reddit'
  | 'custom'

export interface SocialLinkProps {
  /** 社交平台 */
  platform: SocialPlatform
  /** 自定义图标（覆盖默认） */
  icon?: ReactNode
  /** 链接 URL */
  url: string
  /** 显示文本 */
  label?: string
  /** 图标尺寸 */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** 是否显示标签文字 */
  showLabel?: boolean
  /** 变体样式 */
  variant?: 'default' | 'outline' | 'ghost' | 'pill'
  /** 颜色主题 */
  colorTheme?: 'default' | 'brand' | 'gradient'
  /** 是否显示动画 */
  animate?: boolean
  /** 动画延迟 */
  delay?: number
  /** 是否填充背景 */
  filled?: boolean
  /** 自定义 className */
  className?: string
}

/** 社交链接组配置 */
export interface SocialLinkGroupProps {
  /** 链接配置数组 */
  links: Array<{
    platform: SocialPlatform
    url: string
    label?: string
  }>
  /** 排列方向 */
  direction?: 'horizontal' | 'vertical'
  /** 是否显示标签 */
  showLabels?: boolean
  /** 图标尺寸 */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** 变体样式 */
  variant?: 'default' | 'outline' | 'ghost' | 'pill'
  /** 颜色主题 */
  colorTheme?: 'default' | 'brand' | 'gradient'
  /** 是否动画 */
  animate?: boolean
  /** 自定义 className */
  className?: string
}

// ============================================================================
// Constants
// ============================================================================

const PLATFORM_CONFIG: Record<SocialPlatform, { 
  icon: ReactNode
  color: string
  hoverColor: string
  label: string
}> = {
  github: {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    color: 'text-gray-300 bg-slate-800',
    hoverColor: 'hover:text-white hover:bg-slate-700',
    label: 'GitHub'
  },
  twitter: {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    color: 'text-gray-300 bg-slate-800',
    hoverColor: 'hover:text-white hover:bg-[#1DA1F2]',
    label: 'Twitter'
  },
  linkedin: {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: 'text-gray-300 bg-slate-800',
    hoverColor: 'hover:text-white hover:bg-[#0A66C2]',
    label: 'LinkedIn'
  },
  email: {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <path d="M22 6l-10 7L2 6"/>
      </svg>
    ),
    color: 'text-gray-300 bg-slate-800',
    hoverColor: 'hover:text-white hover:bg-red-500',
    label: 'Email'
  },
  website: {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    color: 'text-gray-300 bg-slate-800',
    hoverColor: 'hover:text-white hover:bg-purple-500',
    label: 'Website'
  },
  youtube: {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    color: 'text-gray-300 bg-slate-800',
    hoverColor: 'hover:text-white hover:bg-red-500',
    label: 'YouTube'
  },
  discord: {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
      </svg>
    ),
    color: 'text-gray-300 bg-slate-800',
    hoverColor: 'hover:text-white hover:bg-[#5865F2]',
    label: 'Discord'
  },
  telegram: {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
    color: 'text-gray-300 bg-slate-800',
    hoverColor: 'hover:text-white hover:bg-[#0088cc]',
    label: 'Telegram'
  },
  instagram: {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
      </svg>
    ),
    color: 'text-gray-300 bg-slate-800',
    hoverColor: 'hover:text-white hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-purple-500',
    label: 'Instagram'
  },
  medium: {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
      </svg>
    ),
    color: 'text-gray-300 bg-slate-800',
    hoverColor: 'hover:text-white hover:bg-green-500',
    label: 'Medium'
  },
  dribbble: {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"/>
      </svg>
    ),
    color: 'text-gray-300 bg-slate-800',
    hoverColor: 'hover:text-white hover:bg-pink-500',
    label: 'Dribbble'
  },
  codepen: {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-3.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-5 2.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm10 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
      </svg>
    ),
    color: 'text-gray-300 bg-slate-800',
    hoverColor: 'hover:text-white hover:bg-gray-600',
    label: 'CodePen'
  },
  stackoverflow: {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M15 21h-10v-2h10v2zm6-11.665l-1.621-9.335-1.993.346 1.62 9.335 1.994-.346zm-5.964 6.937l-9.746-.975-.186 2.016 9.755.879.177-1.92zm.538-2.587l-9.276-2.608-.526 2.485 9.306 2.561.496-2.438zm1.204-2.413l-8.297-4.864-1.029 1.743 8.298 4.865 1.028-1.744zm1.866-1.467l-5.339-7.829-1.672 1.14 5.339 7.829 1.672-1.14zm-2.644 4.195v8h-12v-8h-2v10h14v-10h-2z"/>
      </svg>
    ),
    color: 'text-gray-300 bg-slate-800',
    hoverColor: 'hover:text-white hover:bg-orange-500',
    label: 'Stack Overflow'
  },
  reddit: {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
      </svg>
    ),
    color: 'text-gray-300 bg-slate-800',
    hoverColor: 'hover:text-white hover:bg-orange-600',
    label: 'Reddit'
  },
  custom: {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
    color: 'text-gray-300 bg-slate-800',
    hoverColor: 'hover:text-white hover:bg-purple-500',
    label: 'Link'
  }
}

const SIZE_CONFIG = {
  sm: { container: 'w-8 h-8', icon: 16 },
  md: { container: 'w-10 h-10', icon: 20 },
  lg: { container: 'w-12 h-12', icon: 24 },
  xl: { container: 'w-16 h-16', icon: 32 }
}

// ============================================================================
// Components
// ============================================================================

/**
 * SocialLink - 社交链接按钮
 */
export function SocialLink({
  platform,
  icon,
  url,
  label,
  size = 'md',
  showLabel = false,
  variant = 'default',
  colorTheme = 'default',
  animate = true,
  delay = 0,
  filled = false,
  className = ''
}: SocialLinkProps) {
  const config = PLATFORM_CONFIG[platform]
  const sizeConfig = SIZE_CONFIG[size]
  const showCustomIcon = icon !== undefined
  
  // 计算样式
  const variantStyles = {
    default: '',
    outline: 'border border-current',
    ghost: 'bg-transparent hover:bg-white/10',
    pill: 'rounded-full'
  }

  const colorStyles = colorTheme === 'gradient' 
    ? { bg: 'bg-gradient-to-br from-purple-500 to-pink-500', text: 'text-white' }
    : colorTheme === 'brand'
      ? { bg: config.hoverColor, text: '' }
      : { bg: '', text: '' }

  const finalIcon = showCustomIcon ? icon : config.icon

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={animate ? { opacity: 0, scale: 0.8 } : undefined}
      whileInView={animate ? { opacity: 1, scale: 1 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: animate ? delay : 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`
        inline-flex items-center gap-3
        ${variantStyles[variant]}
        ${filled ? colorStyles.bg : config.color}
        ${filled ? '' : config.hoverColor}
        rounded-lg p-2
        transition-all duration-200
        ${showLabel ? 'px-4 py-2' : ''}
        ${className}
      `}
      aria-label={label || config.label}
    >
      <div 
        className={`${sizeConfig.container} flex items-center justify-center flex-shrink-0`}
        style={{ 
          color: filled ? undefined : undefined 
        }}
      >
        <div 
          className="w-full h-full p-1"
          style={{ width: sizeConfig.icon, height: sizeConfig.icon }}
        >
          {finalIcon}
        </div>
      </div>
      
      {showLabel && (
        <span className={`font-medium ${filled ? colorStyles.text || 'text-white' : 'text-gray-200'}`}>
          {label || config.label}
        </span>
      )}
    </motion.a>
  )
}

/**
 * SocialLinkGroup - 社交链接组
 */
export function SocialLinkGroup({
  links,
  direction = 'horizontal',
  showLabels = false,
  size = 'md',
  variant = 'default',
  colorTheme = 'default',
  animate = true,
  className = ''
}: SocialLinkGroupProps) {
  return (
    <div 
      className={`
        flex ${direction === 'horizontal' ? 'flex-row' : 'flex-col'}
        ${direction === 'horizontal' ? 'flex-wrap' : ''}
        gap-3
        ${className}
      `}
    >
      {links.map((link, index) => (
        <SocialLink
          key={link.platform}
          platform={link.platform}
          url={link.url}
          label={link.label}
          showLabel={showLabels}
          size={size}
          variant={variant}
          colorTheme={colorTheme}
          animate={animate}
          delay={index * 0.1}
        />
      ))}
    </div>
  )
}

export default SocialLink