"use client"

import { useEffect, useRef, useState } from "react"
import { Baby, BookOpen, Trophy, Palette, Cpu, Languages } from "lucide-react"
import { cn } from "@/lib/utils"

const programs = [
  {
    icon: Baby,
    title: "Pre-School",
    ages: "Ages 3-5",
    description: "A nurturing environment where young learners develop foundational skills through play-based learning, creativity, and social interaction.",
    color: "bg-pink-50 text-pink-600"
  },
  {
    icon: BookOpen,
    title: "Primary Education",
    ages: "Ages 6-12",
    description: "Comprehensive curriculum covering core subjects with emphasis on critical thinking, literacy, and numeracy skills.",
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: Trophy,
    title: "Sports Program",
    ages: "All Ages",
    description: "Physical education and competitive sports including soccer, athletics, basketball, and swimming to promote fitness and teamwork.",
    color: "bg-green-50 text-green-600"
  },
  {
    icon: Palette,
    title: "Arts & Culture",
    ages: "All Ages",
    description: "Creative expression through visual arts, music, drama, and cultural programs that celebrate Lesotho's rich heritage.",
    color: "bg-purple-50 text-purple-600"
  },
  {
    icon: Cpu,
    title: "STEM Education",
    ages: "Ages 7+",
    description: "Hands-on learning in science, technology, engineering, and mathematics with modern computer labs and robotics.",
    color: "bg-orange-50 text-orange-600"
  },
  {
    icon: Languages,
    title: "Languages",
    ages: "All Ages",
    description: "Multilingual education in English, Sesotho, and French, preparing students for global communication.",
    color: "bg-teal-50 text-teal-600"
  },
]

export function Programs() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="programs" ref={ref} className="py-20 sm:py-28 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-accent font-medium tracking-wide uppercase mb-4">Our Programs</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Comprehensive Education for Every Stage
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            From early childhood to primary education, we offer diverse programs designed to develop well-rounded individuals ready for future challenges.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((program, index) => (
            <div
              key={program.title}
              className={cn(
                "group bg-card rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-500 border border-border/50 hover:border-primary/20",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110",
                program.color
              )}>
                <program.icon className="w-7 h-7" />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-serif text-xl font-bold text-foreground">{program.title}</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">{program.ages}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">{program.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
