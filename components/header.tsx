"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HeaderProps {
  onApplyClick: () => void
}

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#programs", label: "Programs" },
  { href: "#gallery", label: "Campus Life" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
]

export function Header({ onApplyClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={() => scrollToSection("#home")}
            className="flex items-center gap-3"
          >
            <div className="relative h-14 w-14 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Ambassador International School Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="hidden sm:block">
              <p
                className={cn(
                  "font-serif text-lg font-bold leading-tight transition-colors",
                  isScrolled ? "text-foreground" : "text-white"
                )}
              >
                Ambassador
              </p>
              <p
                className={cn(
                  "text-xs uppercase tracking-wider transition-colors",
                  isScrolled ? "text-muted-foreground" : "text-white/80"
                )}
              >
                International School
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  isScrolled
                    ? "text-foreground/80 hover:text-foreground hover:bg-muted"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button
              onClick={onApplyClick}
              className="hidden sm:inline-flex bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Apply Now
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden p-2 rounded-md transition-colors",
                isScrolled
                  ? "text-foreground hover:bg-muted"
                  : "text-white hover:bg-white/10"
              )}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md shadow-lg transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-[400px] border-b" : "max-h-0"
        )}
      >
        <nav className="flex flex-col p-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="px-4 py-3 text-left text-foreground/80 hover:text-foreground hover:bg-muted rounded-md transition-colors"
            >
              {link.label}
            </button>
          ))}

          <Button
            onClick={() => {
              onApplyClick()
              setIsMobileMenuOpen(false)
            }}
            className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Apply Now
          </Button>
        </nav>
      </div>
    </header>
  )
}
