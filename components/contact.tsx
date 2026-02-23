"use client"

import React, { useEffect, useRef, useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    content: "Ambassador International School, Maseru, Lesotho",
    link: "https://maps.app.goo.gl/YWhGS3nLt4hWNBTw5"
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+266 63118056",
    link: "tel:+26663118056"
  },
  {
    icon: Mail,
    title: "Email",
    content: "mbssdrinternational@gmail.com",
    link: "mailto:mbssdrinternational@gmail.com"
  },
  {
    icon: Clock,
    title: "Office Hours",
    content: "Mon - Fri: 7:30 AM - 4:30 PM",
    link: null
  }
]

export function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })

    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <section id="contact" ref={ref} className="py-20 sm:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-accent font-medium tracking-wide uppercase mb-4">Contact Us</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Get in Touch With Us
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Have questions about admissions, programs, or anything else? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Contact Info */}
          <div
            className={cn(
              "lg:col-span-2 transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            )}
          >
            <h3 className="font-serif text-xl font-bold text-foreground mb-6">
              Contact Information
            </h3>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div
                  key={item.title}
                  className={cn(
                    "flex gap-4 transition-all duration-500",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>

                  <div>
                    <p className="font-medium text-foreground">{item.title}</p>
                    {item.link ? (
                      <a
                        href={item.link}
                        target={item.link.startsWith("http") ? "_blank" : undefined}
                        rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{item.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Google Map */}
            <div className="mt-8 aspect-video rounded-xl overflow-hidden bg-muted relative shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d874.9116144032118!2d27.5515438!3d-29.3700059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e8c4bdb30e737f5%3A0x9d023e3235783e3e!2sAmbassador%20International%20School!5e1!3m2!1sen!2sls!4v1770802083178!5m2!1sen!2sls"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ambassador International School Location"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={cn(
              "lg:col-span-3 transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}
          >
            <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-sm border border-border/50">
              <h3 className="font-serif text-xl font-bold text-foreground mb-6">
                Send us a Message
              </h3>

              {isSubmitted ? (
                <div className="py-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
