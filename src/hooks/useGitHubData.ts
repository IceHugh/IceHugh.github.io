import { useState, useEffect, useCallback, useRef } from 'react'

// ============ TypeScript 类型定义 ============

/** GitHub 用户信息 */
export interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  html_url: string
  name: string | null
  company: string | null
  blog: string
  location: string | null
  email: string | null
  bio: string | null
  twitter_username: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

/** GitHub 仓库信息 */
export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  owner: {
    login: string
    id: number
    avatar_url: string
  }
  html_url: string
  description: string | null
  fork: boolean
  url: string
  created_at: string
  updated_at: string
  pushed_at: string
  homepage: string | null
  stargazers_count: number
  watchers_count: number
  language: string | null
  forks_count: number
  open_issues_count: number
  topics: string[]
  visibility: string
  default_branch: string
}

/** 贡献数据（自定义聚合） */
export interface ContributionStats {
  totalStars: number
  totalForks: number
  totalRepos: number
  topLanguages: { language: string; count: number }[]
  recentActivity: {
    name: string
    pushed_at: string
    description: string | null
  }[]
}

/** Hook 返回的数据结构 */
export interface GitHubData {
  user: GitHubUser | null
  repos: GitHubRepo[]
  contributions: ContributionStats | null
  loading: boolean
  error: string | null
  refetch: () => void
}

/** 缓存项 */
interface CacheItem<T> {
  data: T
  timestamp: number
}

// ============ 缓存配置 ============

const CACHE_DURATION = 5 * 60 * 1000 // 5 分钟缓存
const cache = new Map<string, CacheItem<unknown>>()

function getCacheKey(endpoint: string): string {
  return `github_${endpoint}`
}

function getFromCache<T>(key: string): T | null {
  const item = cache.get(key) as CacheItem<T> | undefined
  if (!item) return null
  
  if (Date.now() - item.timestamp > CACHE_DURATION) {
    cache.delete(key)
    return null
  }
  
  return item.data
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() })
}

// ============ API 请求函数 ============

const GITHUB_API_BASE = 'https://api.github.com'
const USERNAME = 'IceHugh'

async function fetchGitHubAPI<T>(endpoint: string): Promise<T> {
  const url = `${GITHUB_API_BASE}${endpoint}`
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    },
  })
  
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('API 速率限制，请稍后重试')
    }
    if (response.status === 404) {
      throw new Error('用户或资源不存在')
    }
    throw new Error(`请求失败: ${response.status}`)
  }
  
  return response.json()
}

// ============ 数据获取函数 ============

async function fetchUser(): Promise<GitHubUser> {
  const cacheKey = getCacheKey('user')
  const cached = getFromCache<GitHubUser>(cacheKey)
  if (cached) return cached
  
  const data = await fetchGitHubAPI<GitHubUser>(`/users/${USERNAME}`)
  setCache(cacheKey, data)
  return data
}

async function fetchRepos(): Promise<GitHubRepo[]> {
  const cacheKey = getCacheKey('repos')
  const cached = getFromCache<GitHubRepo[]>(cacheKey)
  if (cached) return cached
  
  // 获取所有仓库（分页处理，最多 100 个）
  const data = await fetchGitHubAPI<GitHubRepo[]>(
    `/users/${USERNAME}/repos?sort=stars&direction=desc&per_page=100`
  )
  setCache(cacheKey, data)
  return data
}

function calculateContributions(repos: GitHubRepo[]): ContributionStats {
  // 计算总 stars
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
  
  // 计算总 forks
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0)
  
  // 统计语言使用情况
  const languageCount = new Map<string, number>()
  repos.forEach(repo => {
    if (repo.language) {
      languageCount.set(repo.language, (languageCount.get(repo.language) || 0) + 1)
    }
  })
  
  const topLanguages = Array.from(languageCount.entries())
    .map(([language, count]) => ({ language, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
  
  // 最近活跃的仓库（按 pushed_at 排序）
  const recentActivity = [...repos]
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
    .slice(0, 5)
    .map(repo => ({
      name: repo.name,
      pushed_at: repo.pushed_at,
      description: repo.description,
    }))
  
  return {
    totalStars,
    totalForks,
    totalRepos: repos.length,
    topLanguages,
    recentActivity,
  }
}

// ============ 主 Hook ============

export function useGitHubData(): GitHubData {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [contributions, setContributions] = useState<ContributionStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // 使用 ref 跟踪是否已挂载
  const mountedRef = useRef(true)
  
  const fetchData = useCallback(async () => {
    if (!mountedRef.current) return
    
    setLoading(true)
    setError(null)
    
    try {
      // 并行请求用户信息和仓库列表
      const [userData, reposData] = await Promise.all([
        fetchUser(),
        fetchRepos(),
      ])
      
      if (!mountedRef.current) return
      
      setUser(userData)
      setRepos(reposData)
      setContributions(calculateContributions(reposData))
    } catch (err) {
      if (!mountedRef.current) return
      
      const errorMessage = err instanceof Error ? err.message : '获取数据失败'
      setError(errorMessage)
    } finally {
      if (mountedRef.current) {
        setLoading(false)
      }
    }
  }, [])
  
  useEffect(() => {
    mountedRef.current = true
    fetchData()
    
    return () => {
      mountedRef.current = false
    }
  }, [fetchData])
  
  const refetch = useCallback(() => {
    // 清除缓存
    cache.delete(getCacheKey('user'))
    cache.delete(getCacheKey('repos'))
    fetchData()
  }, [fetchData])
  
  return {
    user,
    repos,
    contributions,
    loading,
    error,
    refetch,
  }
}

// ============ 便捷 Hooks ============

/** 仅获取用户信息 */
export function useGitHubUser() {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    let mounted = true
    
    async function load() {
      try {
        const data = await fetchUser()
        if (mounted) setUser(data)
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : '获取用户信息失败')
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }
    
    load()
    
    return () => {
      mounted = false
    }
  }, [])
  
  return { user, loading, error }
}

/** 仅获取仓库列表 */
export function useGitHubRepos(limit?: number) {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    let mounted = true
    
    async function load() {
      try {
        const data = await fetchRepos()
        if (mounted) {
          setRepos(limit ? data.slice(0, limit) : data)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : '获取仓库列表失败')
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }
    
    load()
    
    return () => {
      mounted = false
    }
  }, [limit])
  
  return { repos, loading, error }
}

/** 仅获取贡献统计 */
export function useGitHubContributions() {
  const [contributions, setContributions] = useState<ContributionStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    let mounted = true
    
    async function load() {
      try {
        const reposData = await fetchRepos()
        if (mounted) {
          setContributions(calculateContributions(reposData))
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : '获取贡献数据失败')
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }
    
    load()
    
    return () => {
      mounted = false
    }
  }, [])
  
  return { contributions, loading, error }
}

// ============ 工具函数 ============

/** 格式化数字（如 1.2k, 3.5k） */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

/** 获取语言对应的颜色 */
export function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f7df1e',
    Vue: '#42b883',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    Go: '#00ADD8',
    Rust: '#dea584',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    Shell: '#89e051',
    Dart: '#00B4AB',
    Kotlin: '#A97BFF',
    Swift: '#F05138',
  }
  return colors[language] || '#6b7280'
}

export default useGitHubData