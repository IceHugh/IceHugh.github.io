import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 响应式粒子数量
    const getParticleCount = () => {
      const width = window.innerWidth
      if (width < 768) return 40 // 移动端
      if (width < 1024) return 70 // 平板
      return 100 // 桌面
    }

    // 紫色/粉色渐变色板
    const colors = [
      'rgba(168, 85, 247, 0.8)',   // purple-500
      'rgba(192, 132, 252, 0.8)',  // purple-400
      'rgba(236, 72, 153, 0.8)',   // pink-500
      'rgba(249, 168, 212, 0.8)',  // pink-400
      'rgba(139, 92, 246, 0.8)',   // violet-500
    ]

    // 初始化画布尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // 创建粒子
    const createParticles = (count: number): Particle[] => {
      const particles: Particle[] = []
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          radius: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
      return particles
    }

    // 绘制粒子
    const drawParticle = (particle: Particle) => {
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      ctx.fillStyle = particle.color
      ctx.fill()
    }

    // 绘制连线
    const drawLines = () => {
      const maxDistance = 120

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]

          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.4
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }
    }

    // 更新粒子位置
    const updateParticles = () => {
      particlesRef.current.forEach((particle) => {
        // 粒子缓慢移动
        particle.x += particle.vx
        particle.y += particle.vy

        // 边界反弹
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -1
        }

        // 粒子向鼠标轻微移动（吸引效果）
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance > 0 && distance < 300) {
          const force = (300 - distance) / 3000
          particle.vx += dx * force * 0.1
          particle.vy += dy * force * 0.1
        }

        // 限制最大速度
        const maxSpeed = 3
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
        if (speed > maxSpeed) {
          particle.vx = (particle.vx / speed) * maxSpeed
          particle.vy = (particle.vy / speed) * maxSpeed
        }
      })
    }

    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 绘制连线
      drawLines()

      // 更新并绘制粒子
      updateParticles()
      particlesRef.current.forEach(drawParticle)

      animationRef.current = requestAnimationFrame(animate)
    }

    // 初始化
    resizeCanvas()
    particlesRef.current = createParticles(getParticleCount())
    animate()

    // 监听窗口大小变化
    let resizeTimeout: number
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = window.setTimeout(() => {
        resizeCanvas()
        particlesRef.current = createParticles(getParticleCount())
      }, 200)
    }

    // 监听鼠标移动
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: 'transparent',
      }}
    />
  )
}

export default ParticleBackground