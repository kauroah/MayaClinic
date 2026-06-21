import type { Metadata } from "next"
import Link from "next/link"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/sections/page-header"
import { ContactForm } from "@/components/forms/contact-form"
import { clinicInfo } from "@/lib/data/clinic-info"

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Свяжитесь с Maya Clinic. Узнайте наше местоположение, контактную информацию и часы работы. Мы здесь, чтобы помочь с вашими медицинскими потребностями.",
  openGraph: {
    title: "Контакты | Maya Clinic",
    description:
      "Свяжитесь с Maya Clinic. Узнайте наше местоположение, контактную информацию и часы работы.",
  },
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Контакты"
        description="Мы здесь, чтобы помочь. Свяжитесь с нами по любым вопросам или для записи на прием."
        breadcrumbs={[{ label: "Контакты" }]}
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Свяжитесь с нами
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Есть вопросы или нужно записаться на прием? Свяжитесь с нами
                  через любой из каналов ниже или заполните форму.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Телефон</p>
                        <a
                          href={`tel:${clinicInfo.phone}`}
                          className="text-sm text-muted-foreground hover:text-primary"
                        >
                          {clinicInfo.phone}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Эл. почта</p>
                        <a
                          href={`mailto:${clinicInfo.email}`}
                          className="text-sm text-muted-foreground hover:text-primary"
                        >
                          {clinicInfo.email}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Адрес</p>
                        <p className="text-sm text-muted-foreground">
                          {clinicInfo.address}
                          <br />
                          {clinicInfo.city}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Часы работы</p>
                        <div className="text-sm text-muted-foreground">
                          <p>Пн-Сб: {clinicInfo.hours.weekdays}</p>
                          <p>Вс: {clinicInfo.hours.sunday}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="mb-4 font-semibold text-foreground">
                  Подпишитесь на нас
                </h3>
              <div className="flex gap-4">
              {clinicInfo.socialLinks.vk && (
                <a
                  href={clinicInfo.socialLinks.vk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                  aria-label="VK"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.073 2H8.938C3.332 2 2 3.333 2 8.927v6.136C2 20.667 3.323 22 8.927 22h6.136C20.667 22 22 20.677 22 15.073V8.938C22 3.332 20.677 2 15.073 2zm3.073 14.27h-1.459c-.552 0-.718-.447-1.708-1.437-.864-.833-1.229-.937-1.448-.937-.302 0-.385.083-.385.5v1.312c0 .355-.115.563-1.042.563a5.692 5.692 0 0 1-4.448-2.667 11.626 11.626 0 0 1-2.302-4.833c-.063-.302.094-.458.406-.458h1.459c.313 0 .427.156.531.51.625 1.771 1.656 3.323 2.073 3.323.177 0 .26-.083.26-.51V9.76c-.052-.885-.53-1.146-.53-1.146-.146-.083.094-.156.396-.156h2.292c.333 0 .458.156.458.5v2.604c0 .333.146.448.25.448.177 0 .333-.104.656-.448.75-1.094 1.292-2.396 1.292-2.396.115-.219.27-.427.573-.427h1.459c.333 0 .458.156.458.333 0 .323-.417 1.323-1.042 2.219-.313.427-.646.823-.854 1.083-.208.271-.25.396 0 .677.177.208.76.771 1.146 1.25.781.948 1.188 1.656 1.188 1.656.115.177.104.5-.323.5z"/>
                  </svg>
                </a>
              )}
              {clinicInfo.socialLinks.telegram && (
                <a
                  href={clinicInfo.socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                  aria-label="Telegram"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.66-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.41-.88.03-.24.37-.49 1.02-.74 3.98-1.73 6.64-2.88 7.98-3.43 3.8-1.58 4.59-1.86 5.11-1.87.11 0 .37.03.53.17.14.12.18.28.2.45-.01.06.01.24 0 .37z"/>
                  </svg>
                </a>
              )}
              {clinicInfo.socialLinks.prodoctorov && (
              <a
                href={clinicInfo.socialLinks.prodoctorov}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition"
                aria-label="ProDoctorov"
              >
                <img
                  src="/prodoctorov.jpg"
                  alt="ProDoctorov"
                  className="h-5 w-5"
                />
              </a>
            )}

            {clinicInfo.socialLinks.napopravku && (
              <a
                href={clinicInfo.socialLinks.napopravku}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition"
                aria-label="NaPopravku"
              >
                <img
                  src="/napopravku.png"
                  alt="NaPopravku"
                  className="h-5 w-5"
                />
              </a>
            )}  
            </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="mb-4 font-semibold text-foreground">
                  Быстрые ссылки
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/appointments">Записаться на прием</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/services">Наши услуги</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/doctors">Наши врачи</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Отправьте нам сообщение</CardTitle>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-foreground">
            Как нас найти
          </h2>
          <div className="aspect-video overflow-hidden rounded-lg border border-border bg-muted">
            <iframe
              src={clinicInfo.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Местоположение Maya Clinic"
            />
          </div>
          <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="text-muted-foreground">
              <p className="font-medium text-foreground">{clinicInfo.name}</p>
              <p>{clinicInfo.address}</p>
              <p>{clinicInfo.city}</p>
            </div>
            <Button asChild>
              <a
                href={`https://yandex.ru/maps/?ll=${clinicInfo.coordinates.lng},${clinicInfo.coordinates.lat}&z=17&pt=${clinicInfo.coordinates.lng},${clinicInfo.coordinates.lat}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Проложить маршрут
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}