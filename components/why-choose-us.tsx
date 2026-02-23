"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface WhyChooseUsProps {
  aisImages?: string[]
}

export function WhyChooseUs({ aisImages = [] }: WhyChooseUsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [hasScrolled, setHasScrolled] = useState(false)

  const imgs = aisImages.length >= 3 ? aisImages.slice(0, 3) : []

  const reasons = [
    {
      image: imgs[0] || "/images/hero-2.jpg",
      title: "Expert Educators",
      description:
        "Our team of qualified and passionate teachers brings years of experience and dedication to every classroom.",
    },
    {
      image: imgs[1] || "/images/hero-1.jpg",
      title: "Modern Facilities",
      description:
        "Our campus includes well-equipped labs, library resources, and quality sports facilities.",
    },
    {
      image: imgs[2] || "/images/hero-3.jpg",
      title: "Character Development",
      description:
        "We focus on leadership, values, and confidence beyond academics.",
    },
  ]

  // Reveal on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // Handle ESC + body lock
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null)
    }

    if (selectedImage) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleEsc)
    } else {
      document.body.style.overflow = "auto"
    }

    return () => window.removeEventListener("keydown", handleEsc)
  }, [selectedImage])

  return (
    <>
      <section ref={ref} className="py-20 sm:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div
            className={cn(
              "text-center max-w-3xl mx-auto mb-16 transition-all duration-700",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            <p className="text-accent font-medium tracking-wide uppercase mb-4">
              Why Choose Us
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              The Ambassador Advantage
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Discover what makes our institution exceptional.
            </p>
          </div>

          {/* Reasons */}
          <div className="space-y-20">
            {reasons.map((reason, index) => (
              <div
                key={reason.title}
                className={cn(
                  "grid lg:grid-cols-2 gap-12 items-center transition-all duration-700",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Image with Hover */}
                <div
                  onClick={() => setSelectedImage(reason.image)}
                  className="relative group cursor-pointer"
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-3xl group-hover:-translate-y-2">
                    <Image
                      src={reason.image}
                      alt={reason.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-500" />

                    {/* Hover Text */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                      <span className="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm tracking-wide">
                        Click to View
                      </span>
                    </div>
                  </div>

                  {/* Number Badge */}
                  <div className="absolute -top-4 -left-4 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <span className="text-xl font-bold text-primary-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-serif text-3xl font-bold mb-4">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔥 FULLSCREEN MODAL */}
      <div
        className={cn(
          "fixed inset-0 z-50 transition-all duration-300",
          selectedImage ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        />

        {/* Scrollable Content */}
        <div
          className="relative w-full h-full overflow-y-auto flex justify-center"
          onScroll={() => setHasScrolled(true)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="fixed top-6 right-6 z-50 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md transition"
          >
            <X size={26} />
          </button>

          {/* Scroll Indicator */}
          {!hasScrolled && (
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/70 animate-bounce">
              <span className="text-sm">Scroll</span>
              <div className="w-[2px] h-8 bg-white/60 mt-2 rounded-full" />
            </div>
          )}

          {/* Image */}
          {selectedImage && (
            <div className="relative w-[95%] max-w-6xl my-20 transition-all duration-500 scale-100">
              <Image
                src={selectedImage}
                alt="Expanded view"
                width={1600}
                height={1200}
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}