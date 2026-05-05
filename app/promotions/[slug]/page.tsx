import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Calendar,
  CheckCircle,
  AlertCircle,
  Gift,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PromotionCard } from "@/components/cards/promotion-card"
import { CTASection } from "@/components/sections/cta-section"
import { promotions, getPromotionBySlug, getActivePromotions } from "@/lib/data/promotions"

interface PromotionPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return promotions.map((promotion) => ({
    slug: promotion.slug,
  }))
}

export async function generateMetadata({
  params,
}: PromotionPageProps): Promise<Metadata> {
  const { slug } = await params
  const promotion = getPromotionBySlug(slug)

  if (!promotion) {
    return {
      title: "Promotion Not Found",
    }
  }

  return {
    title: promotion.title,
    description: promotion.description,
    openGraph: {
      title: `${promotion.title} | Maya Clinic Promotions`,
      description: promotion.description,
    },
  }
}

export default async function PromotionPage({ params }: PromotionPageProps) {
  const { slug } = await params
  const promotion = getPromotionBySlug(slug)

  if (!promotion) {
    notFound()
  }

  const validFrom = new Date(promotion.validFrom)
  const validUntil = new Date(promotion.validUntil)
  const today = new Date()
  const isExpired = validUntil < today
  const isExpiringSoon =
    !isExpired && validUntil.getTime() - today.getTime() < 30 * 24 * 60 * 60 * 1000

  const otherPromotions = getActivePromotions()
    .filter((p) => p.slug !== promotion.slug)
    .slice(0, 3)

  return (
    <>
      {/* Promotion Header */}
      <section className="bg-secondary/50 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/promotions"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Promotions
          </Link>

          <div className="flex items-center gap-3">
            <Badge variant="secondary">{promotion.category}</Badge>
            {promotion.discount && (
              <Badge className="bg-primary">{promotion.discount}</Badge>
            )}
            {isExpired && (
              <Badge variant="destructive">Expired</Badge>
            )}
            {isExpiringSoon && !isExpired && (
              <Badge variant="outline" className="border-destructive text-destructive">
                Ending Soon
              </Badge>
            )}
          </div>

          <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {promotion.title}
          </h1>

          <p className="mt-4 text-lg text-muted-foreground">
            {promotion.description}
          </p>

          <div className="mt-6 flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              Valid:{" "}
              {validFrom.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}{" "}
              -{" "}
              <span className={isExpired ? "text-destructive" : isExpiringSoon ? "text-destructive font-medium" : ""}>
                {validUntil.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Promotion Content */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Full Description */}
              <div className="prose prose-gray max-w-none">
                {promotion.fullDescription.split("\n\n").map((block, i) => {
                  if (block.startsWith("## ")) {
                    return (
                      <h2 key={i} className="mt-8 text-2xl font-bold text-foreground">
                        {block.replace("## ", "")}
                      </h2>
                    )
                  }
                  if (block.startsWith("### ")) {
                    return (
                      <h3 key={i} className="mt-6 text-xl font-semibold text-foreground">
                        {block.replace("### ", "")}
                      </h3>
                    )
                  }
                  if (block.startsWith("- ") || block.startsWith("* ")) {
                    const items = block.split("\n").filter((line) => line.trim())
                    return (
                      <ul key={i} className="mt-4 space-y-2">
                        {items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-muted-foreground">
                            <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                            <span>{item.replace(/^[-*]\s*\*\*/, "").replace(/\*\*/g, "")}</span>
                          </li>
                        ))}
                      </ul>
                    )
                  }
                  return (
                    <p key={i} className="mt-4 text-muted-foreground">
                      {block}
                    </p>
                  )
                })}
              </div>

              {/* Terms & Conditions */}
              <div className="mt-12">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-foreground">
                  <AlertCircle className="h-5 w-5 text-muted-foreground" />
                  Terms & Conditions
                </h2>
                <Card>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {promotion.terms.map((term, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                          <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {term}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <Card className="sticky top-24">
                <CardContent className="pt-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Gift className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      {promotion.discount && (
                        <p className="text-2xl font-bold text-primary">
                          {promotion.discount}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        Limited time offer
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      asChild
                      className="w-full"
                      disabled={isExpired}
                    >
                      <Link href="/appointments">
                        {isExpired ? "Promotion Ended" : "Book Now"}
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/contact">Ask a Question</Link>
                    </Button>
                  </div>

                  {!isExpired && (
                    <p className="mt-4 text-center text-xs text-muted-foreground">
                      {isExpiringSoon
                        ? "Hurry! This offer ends soon."
                        : "Book now to secure this special rate."}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Other Promotions */}
      {otherPromotions.length > 0 && (
        <section className="border-t border-border py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-bold text-foreground">
              Other Promotions
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherPromotions.map((promo) => (
                <PromotionCard key={promo.id} promotion={promo} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title="Don't Miss This Offer!"
        description="Book your appointment today to take advantage of this special promotion."
      />
    </>
  )
}
