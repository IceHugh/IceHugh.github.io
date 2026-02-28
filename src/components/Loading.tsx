import { motion } from 'framer-motion'

export interface LoadingProps {
  /** 加载提示文字 */
  text?: string
  /** 是否全屏显示 */
  fullScreen?: boolean
  /** 自定义 className */
  className?: string
}

/**
 * Loading - 加载状态组件
 * 
 * 特性：
 * - 动画骨架屏效果
 * - 支持全屏模式
 * - 紫色主题渐变
 */
export function Loading({
  text = 'Loading...',
  fullScreen = false,
  className = ''
}: LoadingProps) {
  const content = (
    <div className={`flex flex-col items-center justify-center gap-6 ${className}`}>
      {/* 加载动画 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
      />
      
      {/* 加载文字 */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-400 text-lg"
      >
        {text}
      </motion.p>
      
      {/* 骨架屏预览 */}
      <div className="w-full max-w-md space-y-4">
        <div className="h-4 bg-slate-800/50 rounded animate-pulse w-3/4 mx-auto" />
        <div className="h-4 bg-slate-800/50 rounded animate-pulse w-1/2 mx-auto" />
        <div className="h-4 bg-slate-800/50 rounded animate-pulse w-2/3 mx-auto" />
      </div>
    </div>
  )
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center z-50">
        {content}
      </div>
    )
  }
  
  return content
}

/**
 * Skeleton - 骨架屏组件
 */
export interface SkeletonProps {
  /** 宽度 */
  width?: string | number
  /** 高度 */
  height?: string | number
  /** 圆角 */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  /** 自定义 className */
  className?: string
}

export function Skeleton({
  width = '100%',
  height = '1rem',
  rounded = 'md',
  className = ''
}: SkeletonProps) {
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  }
  
  return (
    <div
      className={`bg-slate-800/50 animate-pulse ${roundedClasses[rounded]} ${className}`}
      style={{ width, height }}
    />
  )
}

/**
 * ProjectCardSkeleton - 项目卡片骨架屏
 */
export function ProjectCardSkeleton() {
  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20">
      <div className="flex items-center justify-between mb-3">
        <Skeleton width="40%" height="1.5rem" />
        <Skeleton width="60px" height="1rem" />
      </div>
      <Skeleton width="100%" height="1rem" className="mb-2" />
      <Skeleton width="80%" height="1rem" className="mb-4" />
      <div className="flex items-center justify-between">
        <Skeleton width="80px" height="1.5rem" rounded="full" />
        <Skeleton width="100px" height="1.5rem" rounded="full" />
      </div>
    </div>
  )
}

/**
 * ProfileSkeleton - 个人资料骨架屏
 */
export function ProfileSkeleton() {
  return (
    <div className="text-center mb-20">
      <Skeleton width={128} height={128} rounded="full" className="mx-auto mb-6" />
      <Skeleton width="200px" height="3rem" className="mx-auto mb-4" />
      <Skeleton width="80%" height="1.5rem" className="mx-auto mb-2" />
      <Skeleton width="60%" height="1.5rem" className="mx-auto mb-6" />
      <div className="flex justify-center gap-6">
        <Skeleton width={48} height={48} rounded="full" />
        <Skeleton width={48} height={48} rounded="full" />
      </div>
    </div>
  )
}

export default Loading