"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const reasons = [
  {
    image: "/images/hero-2.jpg",
    title: "Expert Educators",
    description: "Our team of qualified and passionate teachers brings years of experience and dedication to every classroom. They use innovative teaching methods to ensure each student reaches their full potential."
  },
  {
    image: "/images/hero-1.jpg",
    title: "Modern Facilities",
    description: "From well-equipped science laboratories to a comprehensive library and sports facilities, our campus provides the perfect environment for learning and growth."
  },
  {
    image: "/images/hero-3.jpg",
    title: "Character Development",
    description: "Beyond academics, we focus on building strong character, leadership skills, and values that prepare students for life's challenges and opportunities."
  }
]

export function WhyChooseUs() {
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
    <section ref={ref} className="py-20 sm:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-accent font-medium tracking-wide uppercase mb-4">Why Choose Us</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            The Ambassador Advantage
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Discover what sets Ambassador International School apart and why families trust us with their children&apos;s education.
          </p>
        </div>

        {/* Reasons */}
        <div className="space-y-16 lg:space-y-24">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className={cn(
                "grid lg:grid-cols-2 gap-8 lg:gap-16 items-center transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                index % 2 === 1 && "lg:flex-row-reverse"
              )}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Image */}
              <div className={cn("relative", index % 2 === 1 && "lg:order-2")}>
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={reason.image || "/placeholder.svg"}
                    alt={reason.title}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Decorative Number */}
                <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-primary-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className={cn(index % 2 === 1 && "lg:order-1")}>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
