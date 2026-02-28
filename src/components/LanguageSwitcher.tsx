import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import type { SupportedLanguage } from '../i18n/types'

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()

  const changeLanguage = (lng: SupportedLanguage) => {
    i18n.changeLanguage(lng)
    localStorage.setItem('i18nextLng', lng)
  }

  const currentLanguage = i18n.language.startsWith('zh') ? 'zh' : 'en'
  const otherLanguage: SupportedLanguage = currentLanguage === 'zh' ? 'en' : 'zh'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed top-6 right-6 z-50"
    >
      <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-lg rounded-full px-4 py-2 border border-purple-500/20">
        <Globe size={18} className="text-purple-400" />
        <button
          onClick={() => changeLanguage(otherLanguage)}
          className="text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors"
          title={`Switch to ${t(`languageSwitcher.${otherLanguage}`)}`}
        >
          {t(`languageSwitcher.${currentLanguage}`)} → {t(`languageSwitcher.${otherLanguage}`)}
        </button>
      </div>
    </motion.div>
  )
}
