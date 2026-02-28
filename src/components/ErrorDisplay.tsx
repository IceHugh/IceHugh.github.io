import { motion } from 'framer-motion'
import { AlertCircle, RefreshCw, WifiOff, ServerOff, Search } from 'lucide-react'

export interface ErrorDisplayProps {
  /** 错误信息 */
  message: string
  /** 错误类型 */
  type?: 'network' | 'not-found' | 'rate-limit' | 'server' | 'unknown'
  /** 重试回调 */
  onRetry?: () => void
  /** 是否正在重试 */
  isRetrying?: boolean
  /** 自定义 className */
  className?: string
}

/**
 * ErrorDisplay - 错误展示组件
 * 
 * 特性：
 * - 根据错误类型显示不同图标
 * - 支持重试功能
 * - 动画效果
 * - 紫色主题
 */
export function ErrorDisplay({
  message,
  type = 'unknown',
  onRetry,
  isRetrying = false,
  className = ''
}: ErrorDisplayProps) {
  // 根据错误类型选择图标
  const getIcon = () => {
    switch (type) {
      case 'network':
        return <WifiOff size={48} className="text-red-400" />
      case 'not-found':
        return <Search size={48} className="text-yellow-400" />
      case 'rate-limit':
        return <AlertCircle size={48} className="text-orange-400" />
      case 'server':
        return <ServerOff size={48} className="text-red-400" />
      default:
        return <AlertCircle size={48} className="text-purple-400" />
    }
  }
  
  // 根据错误类型选择标题
  const getTitle = () => {
    switch (type) {
      case 'network':
        return '网络连接失败'
      case 'not-found':
        return '资源未找到'
      case 'rate-limit':
        return 'API 请求限制'
      case 'server':
        return '服务器错误'
      default:
        return '出错了'
    }
  }
  
  // 解析错误类型
  
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        flex flex-col items-center justify-center 
        bg-slate-800/50 backdrop-blur-lg 
        rounded-xl p-8 
        border border-red-500/20 
        ${className}
      `}
    >
      {/* 图标 */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="mb-4"
      >
        {getIcon()}
      </motion.div>
      
      {/* 标题 */}
      <h3 className="text-xl font-bold text-red-300 mb-2">
        {getTitle()}
      </h3>
      
      {/* 错误信息 */}
      <p className="text-gray-400 text-center max-w-md mb-6">
        {message}
      </p>
      
      {/* 重试按钮 */}
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          disabled={isRetrying}
          className={`
            flex items-center gap-2 
            px-6 py-3 
            bg-purple-500/20 hover:bg-purple-500/30 
            text-purple-300 
            rounded-lg 
            border border-purple-500/30 
            transition-all
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          <RefreshCw 
            size={18} 
            className={isRetrying ? 'animate-spin' : ''} 
          />
          {isRetrying ? '重试中...' : '重试'}
        </motion.button>
      )}
    </motion.div>
  )
}

/**
 * ErrorBoundary - 错误边界组件（用于捕获渲染错误）
 */
export interface ErrorBoundaryProps {
  /** 子组件 */
  children: React.ReactNode
  /** 自定义错误渲染 */
  fallback?: React.ReactNode
  /** 错误回调 */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

/**
 * InlineError - 内联错误提示
 */
export interface InlineErrorProps {
  /** 错误信息 */
  message: string
  /** 自定义 className */
  className?: string
}

export function InlineError({ message, className = '' }: InlineErrorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`
        flex items-center gap-2 
        px-3 py-2 
        bg-red-500/10 
        border border-red-500/20 
        rounded-lg 
        text-red-400 text-sm
        ${className}
      `}
    >
      <AlertCircle size={16} />
      {message}
    </motion.div>
  )
}

/**
 * EmptyState - 空状态组件
 */
export interface EmptyStateProps {
  /** 提示文字 */
  message?: string
  /** 图标 */
  icon?: React.ReactNode
  /** 操作按钮 */
  action?: React.ReactNode
  /** 自定义 className */
  className?: string
}

export function EmptyState({
  message = '暂无数据',
  icon,
  action,
  className = ''
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`
        flex flex-col items-center justify-center 
        py-12 
        text-gray-500
        ${className}
      `}
    >
      {icon && <div className="mb-4 opacity-50">{icon}</div>}
      <p className="text-lg">{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </motion.div>
  )
}

export default ErrorDisplay