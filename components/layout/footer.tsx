import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from "lucide-react"
import { clinicInfo, footerNavItems } from "@/lib/data/clinic-info"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Clinic Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/maya-clinic-logo.png"
                alt="Maya Clinic"
                width={150}
                height={34}
                className="h-9 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              {clinicInfo.tagline}
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  {clinicInfo.address}
                  <br />
                  {clinicInfo.city}
                </span>
              </div>
              <a
                href={`tel:${clinicInfo.phone}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground"
              >
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                {clinicInfo.phone}
              </a>
              <a
                href={`mailto:${clinicInfo.email}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground"
              >
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                {clinicInfo.email}
              </a>
              <div className="flex items-start gap-3 text-muted-foreground">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p>Пн-Сб: {clinicInfo.hours.weekdays}</p>
                  <p>Вс: {clinicInfo.hours.sunday}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Услуги
            </h3>
            <ul className="space-y-3">
              {footerNavItems.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Компания
            </h3>
            <ul className="space-y-3">
              {footerNavItems.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Поддержка
            </h3>
            <ul className="space-y-3">
              {footerNavItems.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            {/* Social Links */}
          <div className="mt-6">
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              Мы в соцсетях
            </h4>
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
              {clinicInfo.socialLinks.instagram && (
                <a
                  href={clinicInfo.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
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
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {clinicInfo.name}. Все права
              защищены.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/privacy-policy"
                className="text-muted-foreground hover:text-foreground"
              >
                Политика конфиденциальности
              </Link>
              <Link
                href="/licenses"
                className="text-muted-foreground hover:text-foreground"
              >
                Лицензии
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
