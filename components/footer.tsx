"use client"

import React from "react"

import { useState } from "react"
import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight, Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Campus Life", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
]

const programs = [
  { label: "Pre-School", href: "#programs" },
  { label: "Primary Education", href: "#programs" },
  { label: "Sports Program", href: "#programs" },
  { label: "Arts & Culture", href: "#programs" },
  { label: "STEM Education", href: "#programs" },
  { label: "Languages", href: "#programs" },
]

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
]

interface FooterProps {
  onApplyClick: () => void
}

export function Footer({ onApplyClick }: FooterProps) {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    
    setIsSubscribing(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubscribing(false)
    setIsSubscribed(true)
    setEmail("")
    setTimeout(() => setIsSubscribed(false), 5000)
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="font-serif text-lg font-bold">Ambassador</p>
                <p className="text-xs text-primary-foreground/70 uppercase tracking-wider">International School</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed mb-6">
              Nurturing tomorrow&apos;s leaders through academic excellence, character development, and holistic education since 2009.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Our Programs</h3>
            <ul className="space-y-3">
              {programs.map((program) => (
                <li key={program.label}>
                  <button
                    onClick={() => scrollToSection(program.href)}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {program.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Stay Updated</h3>
            <p className="text-primary-foreground/80 mb-4">
              Subscribe to our newsletter for school updates and news.
            </p>
            {isSubscribed ? (
              <div className="flex items-center gap-2 text-accent">
                <CheckCircle className="w-5 h-5" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={isSubscribing}
                    className="bg-accent text-accent-foreground hover:bg-accent/90 px-3"
                  >
                    {isSubscribing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </form>
            )}

            {/* CTA */}
            <div className="mt-8 p-4 rounded-lg bg-primary-foreground/10">
              <p className="font-medium mb-2">Ready to Join?</p>
              <p className="text-sm text-primary-foreground/70 mb-3">
                Start your child&apos;s journey with us today.
              </p>
              <Button
                onClick={onApplyClick}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Mail className="w-4 h-4 mr-2" />
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/70">
              &copy; {new Date().getFullYear()} Ambassador International School. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-primary-foreground/70">
              <button className="hover:text-primary-foreground transition-colors">Privacy Policy</button>
              <button className="hover:text-primary-foreground transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
