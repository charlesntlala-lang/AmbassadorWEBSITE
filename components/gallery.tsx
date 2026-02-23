"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

const staticGalleryImages = [
  { src: "/images/img3.jpg", alt: "Science laboratory", caption: "State-of-the-art Science Lab" },
  { src: "/images/img5.jpg", alt: "Cultural performance", caption: "Cultural Arts Performance" },
  { src: "/images/img6.jpg", alt: "School library", caption: "Modern Library" },
  { src: "/images/img7.jpg", alt: "Preschool activities", caption: "Early Learning Center" },
  { src: "/images/img8.jpg", alt: "Computer lab", caption: "Technology Center" },
  { src: "/images/img9.jpg", alt: "Sports activities", caption: "Sports & Athletics" },
]

interface GalleryProps {
  aisImages?: string[]
}

export function Gallery({ aisImages = [] }: GalleryProps) {
  const images = [
    ...staticGalleryImages,
    ...aisImages.map((src) => ({
      src,
      alt: "Gallery image",
      caption: "",
    })),
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [modalIndex, setModalIndex] = useState<number | null>(null)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const nextModal = () => {
    if (modalIndex === null) return
    setModalIndex((modalIndex + 1) % images.length)
  }

  const prevModal = () => {
    if (modalIndex === null) return
    setModalIndex((modalIndex - 1 + images.length) % images.length)
  }

  // Autoplay
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  // ESC + Arrow navigation + scroll lock
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (modalIndex === null) return

      if (e.key === "Escape") setModalIndex(null)
      if (e.key === "ArrowRight") nextModal()
      if (e.key === "ArrowLeft") prevModal()
    }

    if (modalIndex !== null) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKey)
    } else {
      document.body.style.overflow = "auto"
    }

    return () => window.removeEventListener("keydown", handleKey)
  }, [modalIndex])

  return (
    <>
      {/* ===== GALLERY SECTION ===== */}
      <section id="gallery" className="py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-6 relative">
          
          {/* Main Image */}
          <div
            className="relative aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            onClick={() => setModalIndex(currentIndex)}
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

            {/* Click Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
              <span className="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm tracking-wide transition transform group-hover:scale-105">
                Click to View
              </span>
            </div>

            {/* Caption */}
            <div className="absolute bottom-6 left-6 text-white text-lg font-semibold">
              {images[currentIndex].caption}
            </div>
          </div>

          {/* Carousel Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
          >
            <ChevronRight />
          </button>
        </div>
      </section>

      {/* ===== MODAL ===== */}
      {modalIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center">
          
          {/* Background Click Close */}
          <div
            className="absolute inset-0"
            onClick={() => setModalIndex(null)}
          />

          {/* Modal Content */}
          <div className="relative w-[95%] max-w-6xl transition-all duration-500">
            
            {/* Close */}
            <button
              onClick={() => setModalIndex(null)}
              className="absolute -top-14 right-0 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md"
            >
              <X size={26} />
            </button>

            {/* Image */}
            <Image
              src={images[modalIndex].src}
              alt="Expanded view"
              width={1600}
              height={1200}
              className="w-full h-auto max-h-[90vh] object-contain rounded-2xl"
            />

            {/* Modal Navigation */}
            <button
              onClick={prevModal}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={nextModal}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}