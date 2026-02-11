"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Award, Users, BookOpen, Target } from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Award,
    title: "Academic Excellence",
    description: "Rigorous curriculum designed to challenge and inspire students at every level."
  },
  {
    icon: Users,
    title: "Qualified Staff",
    description: "Experienced educators dedicated to nurturing each student's unique potential."
  },
  {
    icon: BookOpen,
    title: "Modern Resources",
    description: "State-of-the-art facilities and learning materials for comprehensive education."
  },
  {
    icon: Target,
    title: "Holistic Approach",
    description: "Focus on academic, social, emotional, and physical development."
  },
]

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={ref} className="py-20 sm:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <div
            className={cn(
              "relative transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            )}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/img8.jpg"
                alt="Students in library at Ambassador International School"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/20 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
          </div>

          {/* Content Column */}
          <div
            className={cn(
              "transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}
          >
            <p className="text-accent font-medium tracking-wide uppercase mb-4">About Our School</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Building a Foundation for Lifelong Success
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Ambassador International School is a premier educational institution in Lesotho, committed to providing exceptional learning experiences. Since our founding, we have been dedicated to nurturing young minds and preparing students for the challenges of tomorrow.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Our mission is to develop confident, creative, and compassionate learners who will make positive contributions to society. We combine academic rigor with character development to ensure our students are well-prepared for future success.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={cn(
                    "flex gap-4 transition-all duration-500",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
