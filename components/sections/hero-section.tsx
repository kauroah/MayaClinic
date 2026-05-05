// components/sections/hero-section.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarDays, MessageCircle, MapPin, ChevronLeft, ChevronRight, Phone, Play, ArrowRight } from "lucide-react"
import { useState, useEffect, useCallback } from "react"

const slides = [
  {
    id: 1,
    image: "/clinic/maya-clinic.JPG",
    subtitle: "Ведущая клиника Казани",
    title: "Maya Clinic",
    description: "Современное оборудование и передовые технологии для вашего здоровья и красоты",
    alt: "Современное медицинское оборудование в клинике Maya Clinic",
    cta: {
      text: "Записаться на приём",
      href: "/appointments"
    }
  },
  {
    id: 2,
    image: "/clinic/clinic-hero-2.JPG",
    subtitle: "Профессиональная команда",
    title: "Опытные врачи",
    description: "Сертифицированные специалисты с многолетней практикой помогут решить любые проблемы со здоровьем",
    alt: "Команда врачей клиники Maya Clinic в Казани",
    cta: {
      text: "Наши врачи",
      href: "/doctors"
    }
  },
  {
    id: 3,
    image: "/clinic/clinic-modern.JPG",
    subtitle: "Комфорт и безопасность",
    title: "Забота о вас",
    description: "Уютная атмосфера, индивидуальный подход и полный спектр медицинских услуг в одной клинике",
    alt: "Интерьер клиники Maya Clinic в Казани",
    cta: {
      text: "Наши услуги",
      href: "/services"
    }
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  // Auto-play slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [nextSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide()
      if (e.key === "ArrowRight") nextSlide()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  return (
    <section className="relative h-[600px] lg:h-[700px] overflow-hidden bg-foreground">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== currentSlide}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="container relative mx-auto h-full px-4">
        <div className="flex h-full items-center">
          <div className="grid h-full w-full grid-cols-1 items-center gap-8 lg:grid-cols-12">
            {/* Main content */}
            <div className="flex flex-col gap-6 pt-16 lg:pt-0 lg:col-span-7">
              <div className="space-y-4">
                <p className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-primary-foreground/80 bg-primary/20 backdrop-blur-sm rounded-full px-4 py-1.5 w-fit">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  {slides[currentSlide].subtitle}
                </p>
                <h1 className="text-balance text-5xl font-bold tracking-tight text-primary-foreground sm:text-6xl lg:text-7xl">
                  {slides[currentSlide].title}
                </h1>
                <p className="max-w-xl text-lg text-primary-foreground/80">
                  {slides[currentSlide].description}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="gap-2 shadow-lg shadow-primary/25">
                  <Link href={slides[currentSlide].cta.href}>
                    {slides[currentSlide].cta.text}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Slide navigation */}
              <div className="flex items-center gap-4">
                <button
                  onClick={prevSlide}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-primary-foreground/30 text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                  aria-label="Предыдущий слайд"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-primary-foreground/30 text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                  aria-label="Следующий слайд"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                
                {/* Dot indicators */}
                <div className="ml-4 flex items-center gap-2" role="tablist" aria-label="Слайды">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "w-8 bg-primary"
                          : "w-2.5 bg-primary-foreground/40 hover:bg-primary-foreground/60"
                      }`}
                      aria-label={`Перейти к слайду ${index + 1}`}
                      role="tab"
                      aria-selected={index === currentSlide}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Quick actions sidebar - Desktop */}
            <div className="hidden flex-col gap-3 lg:col-span-5 lg:flex lg:pl-12">

              {/* Appointment button */}
              <Link href="/appointments" className="block transition-transform hover:scale-105">
                <Button
                  size="lg"
                  className="h-auto w-full justify-start gap-4 rounded-2xl px-5 py-4 text-left"
                >
                  <CalendarDays className="h-6 w-6 shrink-0" />
                  <div>
                    <p className="font-semibold">Записаться</p>
                    <p className="text-xs font-normal opacity-80">на приём</p>
                  </div>
                </Button>
              </Link>

              <a
                href="https://t.me/maya_clinic_kzn"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-transform hover:scale-105"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="h-auto w-full justify-start gap-4 rounded-2xl border-primary-foreground/20 bg-primary-foreground/10 px-5 py-4 text-left text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
                  asChild={false}
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
                    <div className="relative h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <div>
                    <p className="font-semibold">Онлайн</p>
                    <p className="text-xs font-normal opacity-80">консультация</p>
                  </div>
                </Button>
              </a>

              {/* Phone number */}
              <a
                href="tel:+78435586052"
                className="group rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-4 backdrop-blur-sm transition-all hover:bg-primary-foreground/20"
              >
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary-foreground group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-sm text-primary-foreground/70">Позвонить</p>
                    <p className="font-semibold text-primary-foreground">+7 (843) 558-60-52</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile quick actions */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/90 to-transparent p-4 lg:hidden">
        <div className="container mx-auto flex gap-3">
          <Link href="/appointments" className="flex-1">
            <Button size="lg" className="w-full rounded-xl">
              <CalendarDays className="h-5 w-5 mr-2" />
              Записаться на приём
            </Button>
          </Link>
          <a
            href="https://t.me/maya_clinic_kzn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}