"use client"

// This is a server component. stateful interactivity is delegated to a nested client subcomponent.

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



// client-only subcomponent for interactive UI

import { useState, useEffect } from "react"

interface ClientHomeProps {}

function ClientHome(_: ClientHomeProps) {
  const [aisImages, setAisImages] = useState<string[]>([]);
  const [heroImages, setHeroImages] = useState<string[]>([]);

  useEffect(() => {
    // fetch list from API, separate ais & hero
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => {
        setAisImages(data.ais || []);
        setHeroImages(data.hero || []);
      })
      .catch(() => {
        setAisImages([]);
        setHeroImages([]);
      });
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <main className="min-h-screen">
      <Header onApplyClick={openModal} />
      <Hero onApplyClick={openModal} heroImages={heroImages} />
      <Stats />
      <About aisImages={aisImages} />
      <Programs onApplyClick={openModal} />
      <WhyChooseUs aisImages={aisImages} />
      <Gallery aisImages={aisImages} />
      <Testimonials />
      <Contact />
      <Footer onApplyClick={openModal} />
      <ApplicationModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </main>
  )
}

export default function Home() {
  // top-level page no longer performs fs operations; ClientHome will fetch data
  return <ClientHome />
}
