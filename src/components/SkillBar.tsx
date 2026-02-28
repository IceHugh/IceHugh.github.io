import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

// ============================================================================
// Types
// ============================================================================

export interface SkillBarProps {
  /** 技能名称 */
  name: string
  /** 熟练度 0-100 */
  level: number
  /** 技能图标 */
  icon?: ReactNode
  /** 渐变起始颜色 */
  gradientFrom?: string
  /** 渐变结束颜色 */
  gradientTo?: string
  /** 是否显示百分比 */
  showLevel?: boolean
  /** 是否显示动画 */
  animate?: boolean
  /** 动画延迟 */
  delay?: number
  /** 动画持续时间 */
  duration?: number
  /** 自定义 className */
  className?: string
  /** 自定义进度条高度 */
  barHeight?: number
}

interface SkillBarWithLabelProps extends SkillBarProps {
  /** 变体名称 */
  variant?: 'default' | 'compact' | 'minimal'
}

// ============================================================================
// Constants
// ============================================================================

const DEFAULT_GRADIENT = {
  from: 'from-purple-500',
  to: 'to-pink-500'
}

const VARIANT_STYLES = {
  default: {
    container: 'bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50',
    iconSize: 24,
    titleSize: 'text-lg',
    barHeight: 2,
    showLabel: true
  },
  compact: {
    container: 'bg-slate-800/30 rounded-lg p-4 border border-purple-500/10',
    iconSize: 20,
    titleSize: 'text-base',
    barHeight: 2,
    showLabel: true
  },
  minimal: {
    container: 'bg-transparent',
    iconSize: 18,
    titleSize: 'text-sm',
    barHeight: 1.5,
    showLabel: false
  }
}

// ============================================================================
// Components
// ============================================================================

/**
 * SkillBar - 单个技能进度条
 */
export function SkillBar({
  name,
  level,
  icon,
  gradientFrom = DEFAULT_GRADIENT.from,
  gradientTo = DEFAULT_GRADIENT.to,
  showLevel = true,
  animate = true,
  delay = 0,
  duration = 1,
  className = '',
  barHeight
}: SkillBarProps) {
  const clampedLevel = Math.min(100, Math.max(0, level))

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Icon */}
      {icon && (
        <div className="text-purple-400 flex-shrink-0">
          {icon}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-gray-200 truncate">{name}</span>
          {showLevel && (
            <span className="text-sm text-gray-400 ml-2">{clampedLevel}%</span>
          )}
        </div>
        
        {/* Progress Bar */}
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            initial={animate ? { width: 0 } : { width: `${clampedLevel}%` }}
            whileInView={animate ? { width: `${clampedLevel}%` } : undefined}
            viewport={{ once: true }}
            transition={{ 
              duration: animate ? duration : 0, 
              delay: animate ? delay : 0,
              ease: 'easeOut'
            }}
            className={`h-full bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-full`}
            style={{ height: barHeight ? `${barHeight}px` : undefined }}
          />
        </div>
      </div>
    </div>
  )
}

/**
 * SkillBarWithLabel - 带标签的技能进度条（可交互版本）
 */
export function SkillBarWithLabel({
  name,
  level,
  icon,
  gradientFrom = DEFAULT_GRADIENT.from,
  gradientTo = DEFAULT_GRADIENT.to,
  showLevel = true,
  animate = true,
  delay = 0,
  duration = 1,
  className = '',
  variant = 'default'
}: SkillBarWithLabelProps) {
  const clampedLevel = Math.min(100, Math.max(0, level))
  const variantStyles = VARIANT_STYLES[variant]

  return (
    <motion.div
      initial={animate ? { opacity: 0, scale: 0.95 } : undefined}
      whileInView={animate ? { opacity: 1, scale: 1 } : undefined}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.3, 
        delay: animate ? delay : 0,
        ease: 'easeOut'
      }}
      whileHover={{ scale: 1.02 }}
      className={`
        ${variantStyles.container}
        hover:border-purple-500/50 
        transition-all duration-300
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        {icon && (
          <div className="text-purple-400">
            {icon}
          </div>
        )}
        <span className={`font-semibold ${variantStyles.titleSize} text-gray-200`}>
          {name}
        </span>
        {showLevel && variantStyles.showLabel && (
          <span className="ml-auto text-sm text-gray-400">{clampedLevel}%</span>
        )}
      </div>

      {/* Progress Bar */}
      <div 
        className="bg-slate-700 rounded-full overflow-hidden"
        style={{ height: `${variantStyles.barHeight}px` }}
      >
        <motion.div
          initial={animate ? { width: 0 } : { width: `${clampedLevel}%` }}
          whileInView={animate ? { width: `${clampedLevel}%` } : undefined}
          viewport={{ once: true }}
          transition={{ 
            duration: animate ? duration : 0, 
            delay: animate ? delay + 0.3 : 0,
            ease: 'easeOut'
          }}
          className={`h-full bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-full`}
        />
      </div>
    </motion.div>
  )
}

/**
 * SkillBarGroup - 技能进度条组（网格布局）
 */
interface SkillBarGroupProps {
  skills: Array<{
    name: string
    level: number
    icon?: ReactNode
  }>
  columns?: 1 | 2 | 3 | 4
  animate?: boolean
  delayBetween?: number
  className?: string
}

export function SkillBarGroup({
  skills,
  columns = 4,
  animate = true,
  delayBetween = 0.1,
  className = ''
}: SkillBarGroupProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-4 ${className}`}>
      {skills.map((skill, index) => (
        <SkillBarWithLabel
          key={skill.name}
          name={skill.name}
          level={skill.level}
          icon={skill.icon}
          animate={animate}
          delay={index * delayBetween}
        />
      ))}
    </div>
  )
}

export default SkillBar