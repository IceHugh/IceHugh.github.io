import { motion } from 'framer-motion'
import { Github, Mail, MapPin, Link as LinkIcon, Twitter, Building, Users, GitBranch, Star, BookOpen } from 'lucide-react'
import type { GitHubUser, ContributionStats } from '../hooks/useGitHubData'
import { formatNumber } from '../hooks/useGitHubData'

export interface UserProfileProps {
  /** GitHub 用户数据 */
  user: GitHubUser
  /** 贡献统计 */
  contributions?: ContributionStats | null
  /** 是否显示动画 */
  animate?: boolean
  /** 自定义 className */
  className?: string
}

/**
 * UserProfile - GitHub 用户信息展示组件
 * 
 * 特性：
 * - 展示用户头像、名称、简介
 * - 显示关注者、仓库数等统计
 * - 支持社交链接
 * - 动画效果
 */
export function UserProfile({
  user,
  contributions,
  animate = true,
  className = ''
}: UserProfileProps) {
  // 生成头像 initials
  const initials = user.name 
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user.login.slice(0, 2).toUpperCase()
  
  return (
    <motion.section
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      animate={animate ? { opacity: 1, y: 0 } : undefined}
      className={`text-center mb-20 ${className}`}
    >
      {/* Avatar */}
      <motion.div
        initial={animate ? { scale: 0.8, opacity: 0 } : undefined}
        animate={animate ? { scale: 1, opacity: 1 } : undefined}
        transition={{ delay: 0.2 }}
        className="inline-block mb-6"
      >
        {user.avatar_url ? (
          <img
            src={user.avatar_url}
            alt={user.name || user.login}
            className="w-32 h-32 rounded-full shadow-2xl border-4 border-purple-500/30"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-5xl font-bold shadow-2xl">
            {initials}
          </div>
        )}
      </motion.div>
      
      {/* Name */}
      <motion.h1
        initial={animate ? { opacity: 0 } : undefined}
        animate={animate ? { opacity: 1 } : undefined}
        transition={{ delay: 0.4 }}
        className="text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
      >
        {user.name || user.login}
      </motion.h1>
      
      {/* Username */}
      {user.name && (
        <motion.p
          initial={animate ? { opacity: 0 } : undefined}
          animate={animate ? { opacity: 1 } : undefined}
          transition={{ delay: 0.5 }}
          className="text-lg text-gray-400 mb-4"
        >
          @{user.login}
        </motion.p>
      )}
      
      {/* Bio */}
      {user.bio && (
        <motion.p
          initial={animate ? { opacity: 0 } : undefined}
          animate={animate ? { opacity: 1 } : undefined}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed"
        >
          {user.bio}
        </motion.p>
      )}
      
      {/* Info Tags */}
      <motion.div
        initial={animate ? { opacity: 0 } : undefined}
        animate={animate ? { opacity: 1 } : undefined}
        transition={{ delay: 0.7 }}
        className="flex flex-wrap justify-center gap-4 mb-6"
      >
        {user.location && (
          <span className="flex items-center gap-2 text-gray-400">
            <MapPin size={16} className="text-purple-400" />
            {user.location}
          </span>
        )}
        {user.company && (
          <span className="flex items-center gap-2 text-gray-400">
            <Building size={16} className="text-purple-400" />
            {user.company}
          </span>
        )}
        {user.blog && (
          <a
            href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
          >
            <LinkIcon size={16} className="text-purple-400" />
            {user.blog.replace(/^https?:\/\//, '')}
          </a>
        )}
      </motion.div>
      
      {/* Stats Cards */}
      <motion.div
        initial={animate ? { opacity: 0 } : undefined}
        animate={animate ? { opacity: 1 } : undefined}
        transition={{ delay: 0.75 }}
        className="flex flex-wrap justify-center gap-4 mb-6"
      >
        <StatCard
          icon={<Users size={18} />}
          label="Followers"
          value={user.followers}
        />
        <StatCard
          icon={<GitBranch size={18} />}
          label="Following"
          value={user.following}
        />
        <StatCard
          icon={<BookOpen size={18} />}
          label="Repos"
          value={user.public_repos}
        />
        {contributions && (
          <StatCard
            icon={<Star size={18} />}
            label="Total Stars"
            value={contributions.totalStars}
          />
        )}
      </motion.div>
      
      {/* Social Links */}
      <motion.div
        initial={animate ? { opacity: 0 } : undefined}
        animate={animate ? { opacity: 1 } : undefined}
        transition={{ delay: 0.8 }}
        className="flex justify-center gap-4"
      >
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-slate-800/50 backdrop-blur-lg rounded-full hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/50 transition-all group"
          aria-label="GitHub Profile"
        >
          <Github size={24} className="text-gray-400 group-hover:text-purple-400 transition-colors" />
        </a>
        {user.email && (
          <a
            href={`mailto:${user.email}`}
            className="p-3 bg-slate-800/50 backdrop-blur-lg rounded-full hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/50 transition-all group"
            aria-label="Email"
          >
            <Mail size={24} className="text-gray-400 group-hover:text-purple-400 transition-colors" />
          </a>
        )}
        {user.twitter_username && (
          <a
            href={`https://twitter.com/${user.twitter_username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-slate-800/50 backdrop-blur-lg rounded-full hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/50 transition-all group"
            aria-label="Twitter"
          >
            <Twitter size={24} className="text-gray-400 group-hover:text-purple-400 transition-colors" />
          </a>
        )}
      </motion.div>
    </motion.section>
  )
}

/**
 * StatCard - 统计卡片
 */
interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: number
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/30 rounded-lg border border-purple-500/10">
      <span className="text-purple-400">{icon}</span>
      <span className="text-gray-400 text-sm">{label}:</span>
      <span className="text-white font-bold">{formatNumber(value)}</span>
    </div>
  )
}

/**
 * UserProfileSkeleton - 用户信息骨架屏
 */
export function UserProfileSkeleton() {
  return (
    <div className="text-center mb-20 animate-pulse">
      <div className="w-32 h-32 rounded-full bg-slate-700/50 mx-auto mb-6" />
      <div className="h-10 bg-slate-700/50 rounded w-48 mx-auto mb-4" />
      <div className="h-6 bg-slate-700/50 rounded w-32 mx-auto mb-6" />
      <div className="h-6 bg-slate-700/50 rounded w-2/3 max-w-lg mx-auto mb-6" />
      <div className="flex justify-center gap-4 mb-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-10 w-24 bg-slate-700/50 rounded-lg" />
        ))}
      </div>
      <div className="flex justify-center gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="w-12 h-12 rounded-full bg-slate-700/50" />
        ))}
      </div>
    </div>
  )
}

export default UserProfile