import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import ParticleBackground from './components/ParticleBackground'
import { ProjectCard } from './components/ProjectCard'
import { SkillBarGroup } from './components/SkillBar'
import { ContributionCard } from './components/ContributionGraph'
import { skills } from './data/skills'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import ThemeToggle from './components/ThemeToggle'
import { useGitHubData, getLanguageColor, type GitHubRepo } from './hooks/useGitHubData'
import { ProjectCardSkeleton } from './components/Loading'
import { ErrorDisplay } from './components/ErrorDisplay'
import { UserProfile, UserProfileSkeleton } from './components/UserProfile'

function App() {
  const { t } = useTranslation()
  const { user, repos, contributions, loading, error, refetch } = useGitHubData()

  // 全屏加载状态
  if (loading && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100 dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 text-slate-900 dark:text-white overflow-hidden relative">
        <ParticleBackground />
        
        {/* Theme & Language Controls */}
        <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-12">
          <UserProfileSkeleton />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // 全屏错误状态
  if (error && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100 dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 text-slate-900 dark:text-white overflow-hidden relative flex items-center justify-center">
        <ParticleBackground />
        
        {/* Theme & Language Controls */}
        <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
        
        <div className="relative z-10">
          <ErrorDisplay
            message={error}
            onRetry={refetch}
            isRetrying={loading}
          />
        </div>
      </div>
    )
  }

  // 将 GitHub repo 数据转换为 ProjectCard 所需格式
  const topRepos = repos
    .filter(repo => !repo.fork) // 排除 fork 的仓库
    .slice(0, 9) // 取前 9 个

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-100 dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 text-slate-900 dark:text-white overflow-hidden relative">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Theme & Language Controls */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* User Profile Section - 使用真实 GitHub 数据 */}
        {user ? (
          <UserProfile 
            user={user} 
            contributions={contributions}
          />
        ) : (
          <UserProfileSkeleton />
        )}

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-center"
          >
            {t('skills.title')}
          </motion.h2>
          <SkillBarGroup skills={skills} columns={4} animate delayBetween={0.1} />
          
          {/* Top Languages from GitHub */}
          {contributions && contributions.topLanguages.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 flex flex-wrap justify-center gap-3"
            >
              <span className="text-gray-600 dark:text-gray-400 text-sm">Top Languages:</span>
              {contributions.topLanguages.map(({ language, count }) => (
                <span
                  key={language}
                  className="flex items-center gap-2 px-3 py-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-full text-sm"
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getLanguageColor(language) }}
                  />
                  <span className="text-slate-700 dark:text-gray-300">{language}</span>
                  <span className="text-gray-500">({count})</span>
                </span>
              ))}
            </motion.div>
          )}
        </motion.section>

        {/* Projects Section - 使用真实 GitHub 数据 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-center"
          >
            {t('projects.title')}
          </motion.h2>
          
          {/* 错误提示（部分数据加载失败） */}
          {error && (
            <div className="mb-6 flex justify-center">
              <ErrorDisplay
                message={error}
                onRetry={refetch}
                isRetrying={loading}
                className="max-w-md"
              />
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading && repos.length === 0 ? (
              // 加载骨架屏
              <>
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <ProjectCardSkeleton key={i} />
                ))}
              </>
            ) : (
              // 真实数据
              topRepos.map((repo: GitHubRepo, index: number) => (
                <ProjectCard
                  key={repo.id}
                  name={repo.name}
                  description={repo.description || 'No description provided'}
                  stars={repo.stargazers_count}
                  forks={repo.forks_count}
                  techStack={repo.topics?.slice(0, 3) || []}
                  repoUrl={repo.html_url}
                  language={repo.language || undefined}
                  languageColor={repo.language ? getLanguageColor(repo.language) : undefined}
                  delay={index * 0.1}
                  animate
                />
              ))
            )}
          </div>
          
          {/* View All Repos Link */}
          {user && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <a
                href={`https://github.com/${user.login}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
              >
                View all {user.public_repos} repositories →
              </a>
            </motion.div>
          )}
        </motion.section>

        {/* Contribution Graph */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <ContributionCard
            username={user?.login || 'IceHugh'}
            animate
            weeks={52}
            showLegend
            showTotal
          />
        </motion.section>

        {/* Recent Activity */}
        {contributions && contributions.recentActivity.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-center"
            >
              ⚡ Recent Activity
            </motion.h2>
            <div className="bg-slate-200/50 dark:bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20">
              <div className="space-y-4">
                {contributions.recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between py-3 border-b border-purple-500/10 last:border-0"
                  >
                    <div>
                      <h4 className="text-purple-500 dark:text-purple-300 font-medium">{activity.name}</h4>
                      <p className="text-gray-500 text-sm">{activity.description}</p>
                    </div>
                    <span className="text-gray-500 text-sm">
                      {new Date(activity.pushed_at).toLocaleDateString('zh-CN', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 py-8 border-t border-purple-500/20"
        >
          <p className="text-sm text-gray-600 dark:text-gray-500">{t('footer.builtWith')}</p>
          <p className="text-xs mt-2 text-gray-500 dark:text-gray-600">
            © {new Date().getFullYear()} {user?.name || 'IceHub'}. Open Source Forever
          </p>
          {user && (
            <p className="text-xs mt-1 text-gray-500 dark:text-gray-600">
              Data from GitHub API • Last updated: {new Date().toLocaleDateString('zh-CN')}
            </p>
          )}
        </motion.footer>
      </div>
    </div>
  )
}

export default App