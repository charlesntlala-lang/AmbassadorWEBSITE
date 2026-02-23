"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HeroProps {
  onApplyClick: () => void
  heroImages?: string[];
}

// build slides from heroImages; each image becomes its own slide
function buildSlides(heroImages: string[] = []) {
  if (heroImages.length) {
    return heroImages.map((img) => ({
      images: [img],
      title: "",
      subtitle: "",
      description: "",
    }));
  }

  // fallback: single-image slides with text as before
  return [
    {
      images: ["/images/hero-1.jpg"],
      title: "Excellence in Education",
      subtitle: "Nurturing Tomorrow's Leaders Today",
      description: "Welcome to Ambassador International School, where academic excellence meets character development in a supportive learning environment."
    },
    {
      images: ["/images/hero-2.jpg"],
      title: "World-Class Learning",
      subtitle: "Innovative Teaching Methods",
      description: "Our dedicated educators use cutting-edge teaching methods to inspire curiosity and foster a lifelong love of learning."
    },
    {
      images: ["/images/hero-3.jpg"],
      title: "Holistic Development",
      subtitle: "Mind, Body, and Spirit",
      description: "Beyond academics, we offer comprehensive programs in sports, arts, and leadership to develop well-rounded individuals."
    }
  ];
}

// slides will be computed in component from props; placeholder not needed

export function Hero({ onApplyClick, heroImages = [] }: HeroProps) {
  // build slides from passed heroImages
  const slides = buildSlides(heroImages);
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
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            index === currentSlide ? "opacity-100" : "opacity-0"
          )}
        >
          {/* single image slide */}
          <div className="absolute inset-0">
            <Image
              src={slide.images[0] || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover md:object-contain"
              priority={index === 0}
            />
          </div>
          <div className="absolute inset-0 bg-primary/60" />
        </div>
      ))}

      {/* Content overlay with buttons under the join text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p className="text-white text-3xl font-bold text-center px-4">
          Join us at Ambassador International School
        </p>
        <div className="mt-4 flex gap-4 pointer-events-auto">
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
            className="border-white text-blue-500 hover:bg-white hover:text-primary text-base px-8"
          >
            Learn More
          </Button>
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
