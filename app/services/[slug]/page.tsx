import Image from "next/image"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Stethoscope,
  Sparkles,
  Smile,
  Baby,
  Heart,
  HeartPulse,
  Activity,
  TestTube,
  CheckCircle,
  Clock,
  Calendar,
  User,
  Shield,
  Award,
  Droplet,
  Bone,
  Ear,
  ArrowRight,
  ExternalLink,
  DollarSign,
  FileText,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PageHeader } from "@/components/sections/page-header"
import { CTASection } from "@/components/sections/cta-section"
import { services, getServiceBySlug } from "@/lib/data/services"

const iconMap: Record<string, LucideIcon> = {
  Stethoscope,
  Sparkles,
  Smile,
  Baby,
  Heart,
  HeartPulse,
  Activity,
  TestTube,
  Droplet,
  Bone,
  Ear,
}

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

// Static params
export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

// Metadata
export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    return {
      title: "Услуга не найдена",
    }
  }

  return {
    title: service.name,
    description: service.description,
    openGraph: {
      title: `${service.name} | Maya Clinic`,
      description: service.description,
    },
  }
}

// Main Page
export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getServiceBySlug(slug)

  if (!service) {
    notFound()
  }

  const IconComponent = iconMap[service.icon] || Stethoscope

  // External Service (Eva Dent)
  if (service.externalBooking) {
    return (
      <>
        <PageHeader
          title={service.name}
          description={service.description}
          breadcrumbs={[
            { label: "Услуги", href: "/services" },
            { label: service.name },
          ]}
        />

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 to-primary/10 shadow-lg">
                <IconComponent className="h-10 w-10 text-primary" />
              </div>

              {/* ⭐ IMAGE FOR EXTERNAL SERVICES */}
              {service.image && (
                <div className="mb-8 overflow-hidden rounded-xl">
                  <Image
                    src={service.image}
                    alt={service.name}
                    width={800}
                    height={400}
                    className="h-auto w-full object-cover"
                    priority
                  />
                </div>
              )}

              <h1 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
                {service.name}
              </h1>

              <div className="mx-auto mb-8 h-1 w-20 rounded-full bg-primary" />

              <div className="prose prose-lg mx-auto text-muted-foreground">
                {service.fullDescription.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" className="gap-2">
                  <a
                    href={service.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Перейти в {service.externalSiteName}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                Вы будете перенаправлены на сайт нашего партнёра для записи на приём
              </p>
            </div>
          </div>
        </section>
      </>
    )
  }

  // Normal Services
  const relatedServices = services
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, 3)

  const hasSubServices = service.subServices && service.subServices.length > 0

  return (
    <>
      <PageHeader
        title={service.name}
        description={service.description}
        breadcrumbs={[
          { label: "Услуги", href: "/services" },
          { label: service.name },
        ]}
      />

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 lg:pr-8">
              {/* Service Header */}
              <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-primary/10">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {service.category}
                    </Badge>
                    {service.duration && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Длительность: {service.duration}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* ⭐ BUTTON TO PRICES PAGE - Mobile and Desktop */}
                <Button 
                  asChild 
                  variant="outline" 
                  size="sm"
                  className="sm:ml-auto gap-2 border-primary/30 hover:bg-primary/5 hover:border-primary/50"
                >
                  {/* <Link href="/prices">
                    <DollarSign className="h-4 w-4" />
                    <span className="hidden sm:inline">Все цены</span>
                    <span className="sm:hidden">Цены</span>
                  </Link> */}
                </Button>
              </div>

              {/* ⭐ SERVICE IMAGE */}
              {service.image && (
                <div className="mb-8 overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={service.image}
                    alt={service.name}
                    width={800}
                    height={400}
                    className="h-auto w-full object-cover"
                    priority
                  />
                </div>
              )}

              {/* Description */}
              <div className="prose prose-gray max-w-none">
                {service.fullDescription.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="mb-4 text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Benefits Section */}
              {service.benefits && service.benefits.length > 0 && (
                <div className="mt-12">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <CheckCircle className="h-5 w-5 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold text-foreground">
                        Что входит в услугу
                      </h2>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {service.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3 rounded-lg border border-border/50 bg-card p-3 transition-colors hover:border-primary/30">
                        <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SubServices with Prices */}
              {hasSubServices && (
                <div className="mt-12">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold text-foreground">
                        Услуги и цены
                      </h2>
                    </div>
                    
                    {/* ⭐ BUTTON TO FULL PRICE LIST */}
                    <Button asChild variant="outline" className="gap-2">
                      <Link href="/prices">
                        <FileText className="h-4 w-4" />
                        Полный каталог цен
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {Object.entries(
                      service.subServices!.reduce((acc, item) => {
                        const key = item.group || "Основные услуги"
                        if (!acc[key]) acc[key] = []
                        acc[key].push(item)
                        return acc
                      }, {} as Record<string, typeof service.subServices>)
                    ).map(([group, items]) => (
                      <Card key={group} className="overflow-hidden">
                        <div className="bg-primary/5 px-6 py-3 border-b">
                          <h3 className="text-lg font-semibold text-primary">
                            {group}
                          </h3>
                        </div>
                        <div className="divide-y">
                          {items && items.map((sub, idx) => (
                            <div
                              key={sub.id}
                              className="flex items-center justify-between px-6 py-4 hover:bg-accent/20 transition-colors"
                            >
                              <span className="text-foreground font-medium">
                                {sub.name}
                              </span>
                              <span className="text-lg font-bold text-primary">
                                {sub.price}
                              </span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    ))}
                    
                    {/* ⭐ BOTTOM PRICE LIST LINK */}
                    <div className="text-center pt-4">
                      <Button asChild variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                        <Link href="/prices">
                          Смотреть все цены клиники
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* ⭐ PRICE LIST BANNER - If no subServices */}
              {!hasSubServices && (
                <div className="mt-12">
                  <Card className="bg-linear-to-br from-primary/5 to-primary/10 border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                            <FileText className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-foreground">
                              Полный каталог цен
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Ознакомьтесь со всеми услугами и актуальными ценами клиники
                            </p>
                          </div>
                        </div>
                        <Button asChild className="gap-2 shrink-0">
                          <Link href="/prices">
                            <DollarSign className="h-4 w-4" />
                            Перейти к ценам
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing & Booking Card */}
              <Card className="sticky top-24 overflow-hidden border-primary/10 shadow-lg">
                <div className="bg-linear-to-r from-primary/10 to-primary/5 px-6 py-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Информация об услуге
                  </h3>
                </div>
                <CardContent className="pt-6">
                  {service.price && (
                    <div className="mb-6 text-center">
                      <p className="text-sm text-muted-foreground mb-1">
                        Стоимость от
                      </p>
                      <p className="text-4xl font-bold text-primary">
                        {service.price}
                      </p>
                      {service.priceNote && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {service.priceNote}
                        </p>
                      )}
                    </div>
                  )}

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <Button asChild className="w-full gap-2" size="lg">
                      <Link href="/appointments">
                        <Calendar className="h-4 w-4" />
                        Записаться на приём
                      </Link>
                    </Button>

                    <Button asChild variant="outline" className="w-full gap-2">
                      <Link href="/contact">
                        <User className="h-4 w-4" />
                        Задать вопрос
                      </Link>
                    </Button>

                    {/* ⭐ QUICK LINK TO PRICES IN SIDEBAR */}
                    <Button asChild variant="ghost" className="w-full gap-2 text-muted-foreground">
                      <Link href="/prices">
                        <DollarSign className="h-4 w-4" />
                        Все цены клиники
                      </Link>
                    </Button>
                  </div>

                  <div className="mt-6 rounded-lg bg-secondary/50 p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4 text-primary" />
                      <span>Без записи | Запись в тот же день</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info Cards */}
              <div className="grid gap-3">
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Опытные врачи</p>
                        <p className="text-sm text-muted-foreground">
                          Сертифицированные специалисты
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Удобный график</p>
                        <p className="text-sm text-muted-foreground">
                          Пн-Сб: 8:00 - 20:00
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <Card>
                  <div className="bg-accent/30 px-6 py-3 border-b">
                    <h3 className="font-semibold text-foreground">
                      Похожие услуги
                    </h3>
                  </div>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {relatedServices.map((related) => (
                        <Link
                          key={related.slug}
                          href={`/services/${related.slug}`}
                          className="flex items-center justify-between p-4 transition-colors hover:bg-accent/20"
                        >
                          <div>
                            <p className="font-medium text-foreground">
                              {related.name}
                            </p>
                            {related.price && (
                              <p className="text-sm text-primary mt-1">
                                от {related.price}
                              </p>
                            )}
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Готовы записаться на эту услугу?"
        description="Запишитесь на приём сегодня и сделайте первый шаг к крепкому здоровью."
      />
    </>
  )
}