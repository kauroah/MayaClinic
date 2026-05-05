import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Clock,
  Shield,
  Users,
  Award,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ServiceCard } from "@/components/cards/service-card"
import { DoctorCard } from "@/components/cards/doctor-card"
import { TestimonialCard } from "@/components/cards/testimonial-card"
import { CTASection } from "@/components/sections/cta-section"
import { HeroSection } from "@/components/sections/hero-section" // ← ADD THIS IMPORT
import { getFeaturedServices } from "@/lib/data/services"
import { getFeaturedDoctors } from "@/lib/data/doctors"
import { getFeaturedTestimonials } from "@/lib/data/testimonials"
import { getFeaturedFAQs } from "@/lib/data/faq"
import { clinicInfo } from "@/lib/data/clinic-info"

export const metadata: Metadata = {
  title: "Maya Clinic - Качественное здравоохранение",
  description: "Ваш надежный поставщик медицинских услуг, предлагающий комплексные медицинские услуги с опытными врачами и современным оборудованием. Запишитесь на прием сегодня.",
  openGraph: {
    title: "Maya Clinic - Качественное здравоохранение",
    description: "Ваш надежный поставщик медицинских услуг, предлагающий комплексные медицинские услуги с опытными врачами и современным оборудованием.",
  },
}

const features = [
  {
    icon: Clock,
    title: "Удобный график",
    description: "Открыто 7 дней в неделю с продленными вечерними часами",
  },
  {
    icon: Shield,
    title: "Страховка принимается",
    description: "Мы работаем с большинством крупных страховых компаний",
  },
  {
    icon: Users,
    title: "Команда экспертов",
    description: "Сертифицированные врачи с многолетним опытом",
  },
  {
    icon: Award,
    title: "Аккредитованное учреждение",
    description: "Аккредитация HA с сертификацией ISO",
  },
]

const stats = [
  { value: "20+", label: "Лет опыта" },
  { value: "50 000+", label: "Обслуженных пациентов" },
  { value: "15+", label: "Медицинских специалистов" },
  { value: "98%", label: "Удовлетворенности пациентов" },
]

export default function HomePage() {
  const featuredServices = getFeaturedServices(4)
  const featuredDoctors = getFeaturedDoctors(3)
  const testimonials = getFeaturedTestimonials(3)
  const faqs = getFeaturedFAQs(6)

  return (
    <>
      {/* ========== REPLACED: Old Hero Section with New HeroSection Component ========== */}
      <HeroSection />

      {/* Features Section */}
      <section className="border-y border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-start gap-4 text-center sm:text-left"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 mx-auto sm:mx-0">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Наши услуги
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Комплексные медицинские услуги, разработанные для удовлетворения всех ваших
              потребностей под одной крышей.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/services">
                Все услуги
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold text-primary-foreground md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-primary-foreground/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Наши врачи
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Наша команда опытных сертифицированных врачей стремится
              предоставлять вам медицинскую помощь высочайшего качества.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/doctors">
                Все врачи
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-secondary/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Что говорят наши пациенты
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Не верьте нам на слово. Вот что наши пациенты
              говорят о своем опыте в Maya Clinic.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/reviews">
                Больше отзывов
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Часто задаваемые вопросы
              </h2>
              <p className="mt-4 text-muted-foreground">
                Найдите ответы на часто задаваемые вопросы о наших услугах, записи
                и политике.
              </p>
              <div className="mt-8">
                <h3 className="font-semibold text-foreground">
                  Остались вопросы?
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Наша команда готова помочь. Свяжитесь с нами для получения дополнительной информации.
                </p>
                <Button asChild className="mt-4">
                  <Link href="/contact">Связаться с нами</Link>
                </Button>
              </div>
            </div>
            <div>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </>
  )
}