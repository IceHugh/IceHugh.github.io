import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react'
import { useTheme, type Theme } from '../hooks'

const themeConfig: Record<Theme, { icon: React.ReactNode; label: string; description: string }> = {
  light: {
    icon: <Sun size={18} />,
    label: '浅色',
    description: '明亮模式',
  },
  dark: {
    icon: <Moon size={18} />,
    label: '深色',
    description: '暗夜模式',
  },
  system: {
    icon: <Monitor size={18} />,
    label: '跟随系统',
    description: '自动切换',
  },
}

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentTheme = themeConfig[theme]
  const currentIcon = resolvedTheme === 'dark' ? <Moon size={20} /> : <Sun size={20} />

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 dark:bg-slate-800/50 border border-purple-500/20 hover:border-purple-500/50 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={`当前主题: ${currentTheme.label}，点击切换`}
        aria-expanded={isOpen}
      >
        <span className="text-gray-400 dark:text-gray-400">
          {currentIcon}
        </span>
        <span className="text-sm text-gray-300 dark:text-gray-300 hidden sm:inline">
          {currentTheme.label}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-40 rounded-xl bg-slate-800/95 dark:bg-slate-800/95 backdrop-blur-lg border border-purple-500/20 shadow-xl overflow-hidden z-50"
          >
            <div className="p-1">
              {(Object.keys(themeConfig) as Theme[]).map((themeKey) => {
                const config = themeConfig[themeKey]
                const isActive = theme === themeKey

                return (
                  <button
                    key={themeKey}
                    onClick={() => {
                      setTheme(themeKey)
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                      isActive
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'text-gray-300 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    <span className={isActive ? 'text-purple-400' : 'text-gray-400'}>
                      {config.icon}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{config.label}</span>
                      <span className="text-xs text-gray-500">{config.description}</span>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="activeTheme"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400"
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ThemeToggle