import en from './locales/en.json'

export type TranslationKey = keyof typeof en

export type SupportedLanguage = 'en' | 'zh'

export const SUPPORTED_LANGUAGES: { code: SupportedLanguage; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' }
]
