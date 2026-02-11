"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const stats = [
  { value: 15, suffix: "+", label: "Years of Excellence" },
  { value: 500, suffix: "+", label: "Students Enrolled" },
  { value: 98, suffix: "%", label: "Success Rate" },
  { value: 50, suffix: "+", label: "Qualified Teachers" },
]

function AnimatedCounter({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value, isVisible])

  return (
    <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-accent">
      {count}{suffix}
    </span>
  )
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative py-16 sm:py-20 bg-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "text-center transition-all duration-700",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} isVisible={isVisible} />
              <p className="mt-2 text-sm sm:text-base text-primary-foreground/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
