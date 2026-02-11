"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { About } from "@/components/about"
import { Programs } from "@/components/programs"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Gallery } from "@/components/gallery"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { ApplicationModal } from "@/components/application-modal"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <main className="min-h-screen">
      <Header onApplyClick={openModal} />
      <Hero onApplyClick={openModal} />
      <Stats />
      <About />
      <Programs />
      <WhyChooseUs />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer onApplyClick={openModal} />
      <ApplicationModal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  )
}
