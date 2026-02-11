"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HeroProps {
  onApplyClick: () => void
}

const slides = [
  {
    image: "/images/hero-1.jpg",
    title: "Excellence in Education",
    subtitle: "Nurturing Tomorrow's Leaders Today",
    description: "Welcome to Ambassador International School, where academic excellence meets character development in a supportive learning environment."
  },
  {
    image: "/images/hero-2.jpg",
    title: "World-Class Learning",
    subtitle: "Innovative Teaching Methods",
    description: "Our dedicated educators use cutting-edge teaching methods to inspire curiosity and foster a lifelong love of learning."
  },
  {
    image: "/images/hero-3.jpg",
    title: "Holistic Development",
    subtitle: "Mind, Body, and Spirit",
    description: "Beyond academics, we offer comprehensive programs in sports, arts, and leadership to develop well-rounded individuals."
  }
]

export function Hero({ onApplyClick }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  const prevSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <section id="home" className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            index === currentSlide ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {slides.map((slide, index) => (
              <div
                key={slide.title}
                className={cn(
                  "transition-all duration-500",
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 absolute"
                )}
              >
                {index === currentSlide && (
                  <>
                    <p className="mb-4 text-accent font-medium tracking-wide uppercase animate-in fade-in slide-in-from-bottom-4 duration-500">
                      {slide.subtitle}
                    </p>
                    <h1 className="mb-6 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight text-balance animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                      {slide.title}
                    </h1>
                    <p className="mb-8 text-lg sm:text-xl text-white/90 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                      {slide.description}
                    </p>
                    <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
                      <Button
                        size="lg"
                        onClick={onApplyClick}
                        className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8"
                      >
                        Apply Now
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={() => {
                          document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })
                        }}
                        className="border-white text-white hover:bg-white hover:text-primary text-base px-8"
                      >
                        Learn More
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true)
                setCurrentSlide(index)
                setTimeout(() => setIsAnimating(false), 500)
              }
            }}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === currentSlide
                ? "w-8 bg-accent"
                : "w-2 bg-white/50 hover:bg-white/70"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
