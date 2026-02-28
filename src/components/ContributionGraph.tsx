import { motion } from 'framer-motion'

// ============================================================================
// Types
// ============================================================================

export interface ContributionDay {
  /** 日期 */
  date: string
  /** 贡献数量 */
  count: number
}

export interface ContributionGraphProps {
  /** 贡献数据 */
  data?: ContributionDay[]
  /** 周数显示（默认显示52周 = 一年） */
  weeks?: number
  /** 是否显示月份标签 */
  showMonthLabels?: boolean
  /** 是否显示星期标签 */
  showDayLabels?: boolean
  /** 是否显示图例 */
  showLegend?: boolean
  /** 是否显示总计 */
  showTotal?: boolean
  /** 是否显示动画 */
  animate?: boolean
  /** 贡献等级颜色配置 */
  levelColors?: string[]
  /** 自定义 className */
  className?: string
  /** GitHub 用户名（用于链接） */
  username?: string
}

// ============================================================================
// Constants
// ============================================================================

const DEFAULT_LEVEL_COLORS = [
  'bg-slate-800',      // 0 - No contribution
  'bg-purple-900',     // 1 - Low
  'bg-purple-700',     // 2 - Medium-Low
  'bg-purple-500',     // 3 - Medium
  'bg-purple-400',     // 4 - High
  'bg-purple-300'      // 5 - Very High
]

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// ============================================================================
// Helper Functions
// ============================================================================

/** 生成模拟贡献数据 */
function generateMockData(weeks: number): ContributionDay[] {
  const data: ContributionDay[] = []
  const today = new Date()
  
  for (let i = weeks * 7 - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    // 生成随机贡献数量 (0-10)
    const count = Math.random() > 0.3 ? Math.floor(Math.random() * 10) : 0
    
    data.push({
      date: date.toISOString().split('T')[0],
      count
    })
  }
  
  return data
}

/** 获取贡献等级 */
function getContributionLevel(count: number, _maxLevel: number = 5): number {
  if (count === 0) return 0
  if (count <= 2) return 1
  if (count <= 5) return 2
  if (count <= 8) return 3
  if (count <= 12) return 4
  return 5
}

/** 计算月份标签位置 */
function getMonthPositions(data: ContributionDay[]): { month: string; index: number }[] {
  const positions: { month: string; index: number }[] = []
  let currentMonth = -1
  
  data.forEach((day, index) => {
    const month = new Date(day.date).getMonth()
    if (month !== currentMonth) {
      currentMonth = month
      positions.push({
        month: MONTH_LABELS[month],
        index: Math.floor(index / 7)
      })
    }
  })
  
  return positions
}

/** 计算总贡献数 */
function getTotalContributions(data: ContributionDay[]): number {
  return data.reduce((sum, day) => sum + day.count, 0)
}

// ============================================================================
// Components
// ============================================================================

/**
 * ContributionGraph - GitHub 贡献图组件
 * 
 * 特性：
 * - 模拟 GitHub 贡献图样式
 * - 支持自定义周数
 * - 支持月份/星期标签
 * - 支持图例显示
 * - 支持数据链接到 GitHub
 * - 响应式设计
 */
export function ContributionGraph({
  data,
  weeks = 52,
  showMonthLabels = true,
  showDayLabels = true,
  showLegend = true,
  showTotal = true,
  animate = true,
  levelColors = DEFAULT_LEVEL_COLORS,
  className = '',
  username
}: ContributionGraphProps) {
  // 使用传入数据或生成模拟数据
  const contributionData = data || generateMockData(weeks)
  const totalContributions = getTotalContributions(contributionData)
  const monthPositions = getMonthPositions(contributionData)

  // 将数据按周分组
  const weeksData: ContributionDay[][] = []
  for (let i = 0; i < contributionData.length; i += 7) {
    weeksData.push(contributionData.slice(i, i + 7))
  }

  // 构建 GitHub 链接
  const githubUrl = username 
    ? `https://github.com/${username}` 
    : undefined

  return (
    <div className={className}>
      {/* Header */}
      {(showTotal || username) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {showTotal && (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-purple-300">
                  {totalContributions.toLocaleString()}
                </span>
                <span className="text-gray-500 text-sm">contributions in the last year</span>
              </div>
            )}
          </div>
          {username && githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              @{username} →
            </a>
          )}
        </div>
      )}

      {/* Graph Container */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-block">
          {/* Month Labels */}
          {showMonthLabels && (
            <div className="flex mb-1 ml-8">
              {monthPositions.map((pos, index) => (
                <span
                  key={`${pos.month}-${index}`}
                  className="text-xs text-gray-500"
                  style={{ 
                    marginLeft: index === 0 ? `${pos.index * 14 - 0}px` : '0',
                    minWidth: '28px'
                  }}
                >
                  {pos.month}
                </span>
              ))}
            </div>
          )}

          {/* Graph */}
          <div className="flex">
            {/* Day Labels */}
            {showDayLabels && (
              <div className="flex flex-col gap-[2px] mr-2">
                {DAY_LABELS.map((day, index) => (
                  index % 2 === 1 ? (
                    <span key={day} className="text-xs text-gray-500 h-[12px] leading-[12px]">
                      {day}
                    </span>
                  ) : (
                    <span key={day} className="h-[12px]" />
                  )
                ))}
              </div>
            )}

            {/* Contribution Squares */}
            <div className="flex gap-[2px]">
              {weeksData.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[2px]">
                  {week.map((day, dayIndex) => {
                    const level = getContributionLevel(day.count)
                    
                    return (
                      <motion.div
                        key={day.date}
                        initial={animate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                        animate={animate ? { scale: 1, opacity: 1 } : undefined}
                        transition={{ 
                          duration: 0.2, 
                          delay: animate ? (weekIndex * 7 + dayIndex) * 0.001 : 0 
                        }}
                        whileHover={{ scale: 1.5 }}
                        className={`
                          w-[12px] h-[12px] rounded-sm 
                          ${levelColors[level]}
                          transition-transform duration-150
                        `}
                        title={`${day.count} contributions on ${day.date}`}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          {showLegend && (
            <div className="flex items-center justify-end gap-1 mt-3">
              <span className="text-xs text-gray-500 mr-1">Less</span>
              {levelColors.map((color, index) => (
                <div
                  key={index}
                  className={`w-[12px] h-[12px] rounded-sm ${color}`}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">More</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * ContributionCard - 带容器的贡献图卡片
 */
interface ContributionCardProps extends ContributionGraphProps {
  /** 标题 */
  title?: string
  /** 副标题 */
  subtitle?: string
}

export function ContributionCard({
  title = 'Contribution Activity',
  subtitle,
  className = '',
  ...props
}: ContributionCardProps) {
  return (
    <motion.div
      initial={props.animate !== false ? { opacity: 0, y: 20 } : undefined}
      whileInView={props.animate !== false ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`
        bg-slate-800/50 backdrop-blur-lg 
        rounded-xl p-6 
        border border-purple-500/20 
        ${className}
      `}
    >
      <h3 className="text-2xl font-bold text-purple-300 mb-1">
        {title}
      </h3>
      {subtitle && (
        <p className="text-gray-400 mb-6">{subtitle}</p>
      )}
      <ContributionGraph {...props} />
    </motion.div>
  )
}

export default ContributionGraph