"use client"

import { useEffect, useRef, useState } from "react"
import { Star, Quote, X } from "lucide-react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    name: "Malefu Mokhesi",
    role: "Parent of Grade 5 Student",
    content: "Ambassador International School has been transformative for my daughter. The teachers are caring and dedicated, and the academic standards are exceptional. She's thriving both academically and socially.",
    rating: 5
  },
  {
    name: "Thabo Moshoeshoe",
    role: "Parent of Pre-School Students",
    content: "We enrolled both our children at Ambassador and couldn't be happier. The early learning program is engaging, and our kids look forward to school every day. The facilities are world-class.",
    rating: 5
  },
  {
    name: "Dr. Palesa Nthako",
    role: "Parent & Community Leader",
    content: "As a parent and educator myself, I appreciate the holistic approach to education here. The balance between academics, sports, and character development is exactly what children need.",
    rating: 5
  },
  {
    name: "Lebohang Tau",
    role: "Former Student, Now University Scholar",
    content: "Ambassador prepared me not just academically but for life. The values I learned and the foundation I built there helped me secure a scholarship to study abroad. Forever grateful!",
    rating: 5
  }
]

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [popupTestimonial, setPopupTestimonial] = useState<number | null>(null)
  const [hasShownPopup, setHasShownPopup] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Show popup after 2 seconds when section comes into view
          if (!hasShownPopup) {
            const timer = setTimeout(() => {
              setPopupTestimonial(Math.floor(Math.random() * testimonials.length))
              setHasShownPopup(true)
            }, 2000)
            return () => clearTimeout(timer)
          }
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasShownPopup])

  return (
    <section id="testimonials" ref={ref} className="py-20 sm:py-28 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-accent font-medium tracking-wide uppercase mb-4">Testimonials</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            What Parents Say About Us
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Hear from our community of parents and students about their experience at Ambassador International School.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={cn(
                "relative bg-card rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-500 border border-border/50",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/80 leading-relaxed mb-6 relative z-10">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Testimonial */}
      {popupTestimonial !== null && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in slide-in-from-right-full duration-500">
          <div className="bg-card rounded-xl p-6 shadow-2xl border border-border">
            <button
              onClick={() => setPopupTestimonial(null)}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted transition-colors"
              aria-label="Close testimonial popup"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
            <div className="flex gap-1 mb-3">
              {Array.from({ length: testimonials[popupTestimonial].rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed mb-4">
              &ldquo;{testimonials[popupTestimonial].content.slice(0, 120)}...&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">
                  {testimonials[popupTestimonial].name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-medium text-sm text-foreground">{testimonials[popupTestimonial].name}</p>
                <p className="text-xs text-muted-foreground">{testimonials[popupTestimonial].role}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
