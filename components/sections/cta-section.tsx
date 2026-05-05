import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { clinicInfo } from "@/lib/data/clinic-info"

interface CTASectionProps {
  title?: string
  description?: string
  primaryButtonText?: string
  primaryButtonHref?: string
  showPhone?: boolean
}

export function CTASection({
  title = "Готовы сделать следующий шаг?",
  description = "Запишитесь на прием сегодня и получите исключительную медицинскую помощь в Maya Clinic.",
  primaryButtonText = "Запись на прием",
  primaryButtonHref = "/appointments",
  showPhone = true,
}: CTASectionProps) {
  return (
    <section className="bg-primary py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-balance text-3xl font-bold text-primary-foreground md:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-primary-foreground/80">
          {description}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="min-w-[200px]"
          >
            <Link href={primaryButtonHref}>{primaryButtonText}</Link>
          </Button>
          {showPhone && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-w-[200px] border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a href={`tel:${clinicInfo.phone}`}>
                <Phone className="mr-2 h-4 w-4" />
                {clinicInfo.phone}
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}