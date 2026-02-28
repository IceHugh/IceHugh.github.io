import type { ReactNode } from 'react'
import { Code2, Database, Globe, Cpu, Lock, Zap } from 'lucide-react'

export interface Skill {
  name: string
  level: number
  icon: ReactNode
  category?: 'frontend' | 'backend' | 'web3' | 'other'
}

export const skills: Skill[] = [
  // Frontend
  { name: 'Vue.js', level: 95, icon: <Globe size={24} />, category: 'frontend' },
  { name: 'React', level: 90, icon: <Code2 size={24} />, category: 'frontend' },
  { name: 'TypeScript', level: 90, icon: <Code2 size={24} />, category: 'frontend' },
  { name: 'Next.js', level: 85, icon: <Zap size={24} />, category: 'frontend' },
  
  // Web3
  { name: 'Bitcoin', level: 85, icon: <Lock size={24} />, category: 'web3' },
  { name: 'Web3', level: 85, icon: <Database size={24} />, category: 'web3' },
  
  // Other
  { name: 'Flutter', level: 80, icon: <Cpu size={24} />, category: 'other' },
  { name: 'Node.js', level: 75, icon: <Zap size={24} />, category: 'backend' },
]

export const skillCategories = {
  frontend: 'Frontend',
  backend: 'Backend',
  web3: 'Web3 & Blockchain',
  other: 'Other'
}
