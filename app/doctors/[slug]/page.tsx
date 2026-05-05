import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image" // ← Make sure this is imported
import { notFound } from "next/navigation"
import {
  Star,
  User,
  GraduationCap,
  Award,
  Clock,
  Languages,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/sections/page-header"
import { TestimonialCard } from "@/components/cards/testimonial-card"
import { CTASection } from "@/components/sections/cta-section"
import { doctors, getDoctorBySlug } from "@/lib/data/doctors"
import { getTestimonialsByDoctor } from "@/lib/data/testimonials"

interface DoctorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return doctors.map((doctor) => ({
    slug: doctor.slug,
  }))
}

export async function generateMetadata({
  params,
}: DoctorPageProps): Promise<Metadata> {
  const { slug } = await params
  const doctor = getDoctorBySlug(slug)

  if (!doctor) {
    return {
      title: "Doctor Not Found",
    }
  }

  return {
    title: `${doctor.name} - ${doctor.specialty}`,
    description: doctor.bio,
    openGraph: {
      title: `${doctor.name} | Maya Clinic`,
      description: doctor.bio,
    },
  }
}

export default async function DoctorPage({ params }: DoctorPageProps) {
  const { slug } = await params
  const doctor = getDoctorBySlug(slug)

  if (!doctor) {
    notFound()
  }

  const testimonials = getTestimonialsByDoctor(doctor.name).slice(0, 3)
  const otherDoctors = doctors
    .filter((d) => d.slug !== doctor.slug)
    .slice(0, 3)

  return (
    <>
      <PageHeader
        title={doctor.name}
        description={doctor.specialty}
        breadcrumbs={[
          { label: "Наши врачи", href: "/doctors" },
          { label: doctor.name },
        ]}
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* ✅ FIXED: Profile Header with actual image */}
              <div className="mb-8 flex flex-col items-start gap-6 sm:flex-row">
                <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full bg-secondary">
                  {doctor.image ? (
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <User className="h-16 w-16 text-primary" />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {doctor.name}
                  </h2>
                  <p className="text-lg text-primary">{doctor.title}</p>
                  <Badge variant="secondary" className="mt-2">
                    {doctor.specialty}
                  </Badge>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{doctor.rating}</span>
                      <span className="text-muted-foreground">
                        ({doctor.reviewCount} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {doctor.experience}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-12">
                <h3 className="mb-4 text-xl font-semibold text-foreground">
                  About {doctor.name.split(" ")[0]}
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  {doctor.fullBio.split("\n\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="mb-12">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Образование
                </h3>
                <ul className="space-y-3">
                  {doctor.education.map((edu, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {edu}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Credentials */}
              <div className="mb-12">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
                  <Award className="h-5 w-5 text-primary" />
                  Сертификаты
                </h3>
                <ul className="space-y-3">
                  {doctor.credentials.map((credential, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {credential}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Testimonials */}
              {testimonials.length > 0 && (
                <div>
                  <h3 className="mb-6 text-xl font-semibold text-foreground">
                    Отзывы пациентов
                  </h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    {testimonials.map((testimonial) => (
                      <TestimonialCard
                        key={testimonial.id}
                        testimonial={testimonial}
                      />
                    ))}
                  </div>
                  <div className="mt-6">
                    <Button asChild variant="outline">
                      <Link href="/reviews">Все отзывы</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <Card className="sticky top-24">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    Записаться
                  </h3>

                  <div className="mt-4 space-y-4">
                    {/* Languages */}
                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Languages className="h-4 w-4" />
                        Языки
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {doctor.languages.map((lang) => (
                          <Badge key={lang} variant="outline">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Available Days */}
                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <Calendar className="h-4 w-4" />
                        Available Days
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {doctor.availableDays.map((day) => (
                          <Badge key={day} variant="secondary">
                            {day.slice(0, 3)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <Button asChild className="w-full">
                      <Link href="/appointments">Запись на прием</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/contact">Контакты</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Other Doctors */}
              {otherDoctors.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="mb-4 text-lg font-semibold text-foreground">
                      Другие врачи
                    </h3>
                    <div className="space-y-3">
                      {otherDoctors.map((other) => (
                        <Link
                          key={other.slug}
                          href={`/doctors/${other.slug}`}
                          className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent"
                        >
                          {/* ✅ FIXED: Use actual image for other doctors */}
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-secondary">
                            {other.image ? (
                              <Image
                                src={other.image}
                                alt={other.name}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <User className="h-5 w-5 text-primary" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {other.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {other.specialty}
                            </p>
                          </div>
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
        title={`Готовы записаться к ${doctor.name.split(" ")[0]}?`}
        description="Запишитесь на прием сегодня и получите квалифицированную помощь."
      />
    </>
  )
}