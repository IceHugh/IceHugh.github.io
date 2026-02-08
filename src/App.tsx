import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Code2, Database, Globe, Cpu, Lock, Zap, Star, ExternalLink, Github, Mail } from 'lucide-react'

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const skills = [
    { name: 'Vue.js', level: 95, icon: <Globe size={24} /> },
    { name: 'React', level: 90, icon: <Code2 size={24} /> },
    { name: 'TypeScript', level: 90, icon: <Code2 size={24} /> },
    { name: 'Next.js', level: 85, icon: <Zap size={24} /> },
    { name: 'Bitcoin', level: 85, icon: <Lock size={24} /> },
    { name: 'Web3', level: 85, icon: <Database size={24} /> },
    { name: 'Flutter', level: 80, icon: <Cpu size={24} /> },
    { name: 'Node.js', level: 75, icon: <Zap size={24} /> },
  ]

  const projects = [
    {
      name: 'btc-connect',
      stars: 18,
      tech: 'TypeScript',
      desc: 'Bitcoin wallet connector unifying Unisat, OKX wallets'
    },
    {
      name: 'dev3',
      stars: 0,
      tech: 'Vue.js',
      desc: 'Web3 open-source project showcase platform'
    },
    {
      name: 'sui-agi',
      stars: 0,
      tech: 'TypeScript',
      desc: 'Sui chain AI projects'
    },
    {
      name: 'market_satsnet',
      stars: 1,
      tech: 'TypeScript',
      desc: 'SAT20 marketplace frontend'
    },
  ]

  const organizations = [
    { name: 'sat20-labs', stars: 3, role: 'Frontend Developer' },
    { name: 'OLProtocol', stars: 0, role: 'Frontend Developer' },
    { name: 'tinyverse-web3', stars: 0, role: 'Frontend Developer' },
    { name: 'ziyue-ai', stars: 0, role: 'Frontend Developer' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-5xl font-bold shadow-2xl">
              IH
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
          >
            IceHugh
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-2xl text-gray-300 mb-6"
          >
            Frontend Developer · Web3 Expert · 10 Years Experience
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center gap-6"
          >
            <a href="https://github.com/IceHugh" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">
              <Github size={28} />
            </a>
            <a href="mailto:IceHugh" className="hover:text-purple-400 transition-colors">
              <Mail size={28} />
            </a>
          </motion.div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            💼 Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-3 text-purple-400">
                  {skill.icon}
                  <span className="font-semibold text-lg">{skill.name}</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  />
                </div>
                <div className="text-right text-sm text-gray-400 mt-1">{skill.level}%</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🚀 Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-purple-300">{project.name}</h3>
                  <div className="flex gap-2 items-center text-gray-400">
                    {project.stars > 0 && (
                      <span className="flex items-center gap-1">
                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                        {project.stars}
                      </span>
                    )}
                    <ExternalLink size={20} />
                  </div>
                </div>
                <p className="text-gray-400 mb-4">{project.desc}</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                    {project.tech}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Organizations Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🏛️ Organization Contributions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {organizations.map((org, index) => (
              <motion.div
                key={org.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-purple-300">{org.name}</h3>
                  {org.stars > 0 && (
                    <div className="flex items-center gap-1 text-gray-400">
                      <Star size={16} className="fill-yellow-400 text-yellow-400" />
                      {org.stars}
                    </div>
                  )}
                </div>
                <p className="text-gray-400">{org.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 py-8 border-t border-purple-500/20"
        >
          <p>Built with Vite + React 19</p>
          <p className="mt-2">© 2026 IceHugh</p>
        </motion.footer>
      </div>
    </div>
  )
}

export default App
