"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { PageHeader } from "@/components/sections/page-header"
import { CTASection } from "@/components/sections/cta-section"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Clock, 
  ArrowRight, 
  Phone, 
  Sparkles, 
  Percent, 
  Shield, 
  Zap,
  Calendar
} from "lucide-react"

const promotions = [
  {
    id: "1",
    title: "Молодой взгляд + идеальный овал лица за одну операцию!",
    subtitle: "Комплексное омоложение",
    href: "/aktsii/aktsiya-molodoj-vzglyad-idealnyj-oval-litsa-za-odnu-operatsiyu",
    image: "/sale1.webp",
    discount: "Специальная цена",
    badge: "Хит продаж",
    color: "from-rose-500 to-pink-500",
    icon: Sparkles,
  },
  {
    id: "2",
    title: "Макс Лифтинг ВСЕ ВКЛЮЧЕНО за 200 000 руб.",
    subtitle: "Премиум подтяжка",
    href: "/aktsii/aktsiya-maks-lift-podtyazhka",
    image: "/sale2.webp",
    discount: "Фиксированная цена",
    badge: "Выгода 30%",
    color: "from-blue-500 to-indigo-500",
    icon: Shield,
  },
  {
    id: "3",
    title: "ДМС в Майя Клиник",
    subtitle: "Страхование здоровья",
    href: "/aktsii/dms-v-majya-klinik",
    image: "/sale3.webp",
    discount: "Специальные условия",
    badge: "Новинка",
    color: "from-emerald-500 to-teal-500",
    icon: Zap,
  },
]

const features = [
  {
    icon: Clock,
    title: "Ограниченное предложение",
    description: "Акции действуют ограниченное время",
  },
  {
    icon: Percent,
    title: "Выгодные условия",
    description: "Экономьте до 30% на процедурах",
  },
  {
    icon: Calendar,
    title: "Быстрая запись",
    description: "Запишитесь онлайн за 2 минуты",
  },
]

export default function PromotionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <>
      <PageHeader
        title="Акции"
        description="Специальные предложения и выгодные условия в «Майя Клиник» — современное оборудование, опытные врачи и комфортная атмосфера"
        breadcrumbs={[{ label: "Акции" }]}
      />

      {/* Hero Section with Gradient Background */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-linear-to-br from-background via-primary/5 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                  <Percent className="w-4 h-4 mr-2" />
                  Специальные предложения 2026
                </Badge>
                <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
                  Премиальные процедуры по{' '}
                  <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    доступным ценам
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  «Майя Клиник» — это сочетание передовых медицинских технологий и доступности. 
                  Мы постоянно расширяем спектр услуг, внедряем революционные методики и делаем 
                  их доступными для вас.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="flex items-start gap-3 p-4 rounded-xl bg-background/50 backdrop-blur-xs border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-md"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Записаться на консультацию
                </Button>
                <a 
                  href="tel:+78435586052" 
                  className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-border hover:border-primary/50 transition-all duration-300 group hover:shadow-md"
                >
                  <Phone className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-lg">+7 (843) 558-60-52</span>
                </a>
              </div>
            </div>

            {/* Right Content - Interactive Image */}
            <div className="relative animate-fade-in-up">
              <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl group">
                <Image
                  src="/sale.JPG"
                  alt="Майя Клиник - премиальные процедуры"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                {/* Floating badges */}
                <div className="absolute top-4 right-4 px-4 py-2 bg-background/90 backdrop-blur-xs rounded-full shadow-lg animate-float">
                  <span className="text-sm font-semibold">🔥 Только сейчас</span>
                </div>
                <div className="absolute bottom-4 left-4 px-4 py-2 bg-primary/90 backdrop-blur-xs text-primary-foreground rounded-full shadow-lg animate-float-delayed">
                  <span className="text-sm font-semibold">До -30%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider with Gradient */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-border" />
        </div>
      </div>

      {/* Promotions Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <Badge variant="secondary" className="mb-4">
              Текущие акции
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
              Выберите подходящее предложение
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {promotions.map((promotion, index) => (
              <div
                key={promotion.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredCard(promotion.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Link href={promotion.href}>
                  <div className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                    {/* Image Container */}
                    <div className="relative aspect-4/5 overflow-hidden">
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-linear-to-t ${promotion.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10`} />
                      
                      <Image
                        src={promotion.image}
                        alt={promotion.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Badge */}
                      {promotion.badge && (
                        <div className="absolute top-4 left-4 z-20">
                          <Badge className={`bg-linear-to-r ${promotion.color} text-white border-0 shadow-lg`}>
                            {promotion.badge}
                          </Badge>
                        </div>
                      )}

                      {/* Hover Overlay with CTA */}
                      <div className={`absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent z-20 transition-all duration-500 ${
                        hoveredCard === promotion.id ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                          <p className="text-sm opacity-90 mb-3">{promotion.subtitle}</p>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">Узнать подробнее</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg bg-linear-to-r ${promotion.color} shrink-0`}>
                          <promotion.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                            {promotion.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {promotion.discount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Using only the props that exist in the component */}
      <CTASection
        title="Не пропустите! Запишитесь на приём прямо сейчас!"
        description="Воспользуйтесь специальными предложениями с ограниченным сроком действия. Наши специалисты подберут индивидуальную программу. Звоните: +7 (843) 558-60-52"
        primaryButtonText="Записаться сейчас"
      />
    </>
  )
}