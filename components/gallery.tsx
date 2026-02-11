"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const galleryImages = [
  { src: "/images/img3.jpg", alt: "Science laboratory", caption: "State-of-the-art Science Lab" },
  { src: "/images/img5.jpg", alt: "Cultural performance", caption: "Cultural Arts Performance" },
  { src: "/images/img6.jpg", alt: "School library", caption: "Modern Library" },
  { src: "/images/img7.jpg", alt: "Preschool activities", caption: "Early Learning Center" },
  { src: "/images/img8.jpg", alt: "Computer lab", caption: "Technology Center" },
  { src: "/images/img9.jpg", alt: "Sports activities", caption: "Sports & Athletics" },
]

export function Gallery() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }, [])

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

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  return (
    <section id="gallery" ref={ref} className="py-20 sm:py-28 bg-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-accent font-medium tracking-wide uppercase mb-4">Campus Life</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-6 text-balance">
            Experience Life at Ambassador
          </h2>
          <p className="text-primary-foreground/80 leading-relaxed">
            Take a glimpse into the vibrant daily life at our school through our photo gallery.
          </p>
        </div>

        {/* Main Carousel */}
        <div
          className={cn(
            "relative transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ transitionDelay: "200ms" }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="relative aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
            {galleryImages.map((image, index) => (
              <div
                key={image.src}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700",
                  index === currentIndex ? "opacity-100" : "opacity-0"
                )}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
                {/* Caption Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 sm:p-8">
                  <p className="text-white text-lg sm:text-xl font-semibold">
                    {image.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Thumbnail Navigation */}
        <div
          className={cn(
            "mt-6 flex justify-center gap-2 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ transitionDelay: "400ms" }}
        >
          {galleryImages.map((image, index) => (
            <button
              key={image.src}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden transition-all duration-300",
                index === currentIndex
                  ? "ring-2 ring-accent ring-offset-2 ring-offset-primary scale-105"
                  : "opacity-60 hover:opacity-100"
              )}
              aria-label={`Go to image ${index + 1}`}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
