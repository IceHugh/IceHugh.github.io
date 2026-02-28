import { motion } from 'framer-motion'
import { Star, ExternalLink, Github } from 'lucide-react'
import type { ReactNode } from 'react'

// ============================================================================
// Types
// ============================================================================

export interface ProjectCardProps {
  /** 项目名称 */
  name: string
  /** 项目描述 */
  description: string
  /** GitHub 仓库链接 */
  repoUrl?: string
  /** 线上链接 */
  liveUrl?: string
  /** Star 数量 */
  stars?: number
  /** Fork 数量 */
  forks?: number
  /** 技术栈标签 */
  techStack?: string[]
  /** 自定义图标 */
  icon?: ReactNode
  /** 语言颜色 */
  languageColor?: string
  /** 语言名称 */
  language?: string
  /** 是否显示动画 */
  animate?: boolean
  /** 动画延迟 */
  delay?: number
  /** 自定义 className */
  className?: string
}

// ============================================================================
// Component
// ============================================================================

/**
 * ProjectCard - 项目展示卡片组件
 * 
 * 特性：
 * - 支持 stars/forks 数量展示
 * - 支持多个技术栈标签
 * - 支持 repo 和 live 双链接
 * - 响应式设计
 * - Framer Motion 动画
 */
export function ProjectCard({
  name,
  description,
  repoUrl,
  liveUrl,
  stars = 0,
  forks = 0,
  techStack = [],
  icon,
  languageColor,
  language,
  animate = true,
  delay = 0,
  className = ''
}: ProjectCardProps) {
  const hasLinks = repoUrl || liveUrl
  const hasMetrics = stars > 0 || forks > 0

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.4, 
        delay: animate ? delay : 0,
        ease: 'easeOut'
      }}
      whileHover={{ scale: 1.03, y: -4 }}
      className={`
        group
        bg-slate-800/50 backdrop-blur-lg 
        rounded-xl p-6 
        border border-purple-500/20 hover:border-purple-500/50 
        transition-all duration-300
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="text-purple-400">
              {icon}
            </div>
          )}
          <h3 className="text-2xl font-bold text-purple-300 group-hover:text-purple-200 transition-colors">
            {name}
          </h3>
        </div>
        
        {/* Links */}
        <div className="flex items-center gap-3 text-gray-400">
          {hasMetrics && (
            <div className="flex items-center gap-3 text-sm">
              {stars > 0 && (
                <span className="flex items-center gap-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  {stars}
                </span>
              )}
              {forks > 0 && (
                <span className="flex items-center gap-1">
                  <Github size={14} />
                  {forks}
                </span>
              )}
            </div>
          )}
          {hasLinks && (
            <ExternalLink 
              size={18} 
              className="opacity-0 group-hover:opacity-100 transition-opacity" 
            />
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 mb-4 line-clamp-2">
        {description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {/* Language */}
        {language && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {languageColor && (
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: languageColor }}
              />
            )}
            <span>{language}</span>
          </div>
        )}

        {/* Tech Stack Tags */}
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {techStack.slice(0, 3).map((tech) => (
              <span 
                key={tech}
                className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            {techStack.length > 3 && (
              <span className="px-3 py-1 bg-slate-700/50 text-gray-400 rounded-full text-xs">
                +{techStack.length - 3}
              </span>
            )}
          </div>
        )}

        {/* External Links */}
        {hasLinks && (
          <div className="flex gap-2">
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-purple-400 transition-colors"
                aria-label={`${name} repository`}
              >
                <Github size={18} />
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-purple-400 transition-colors"
                aria-label={`${name} live site`}
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default ProjectCard