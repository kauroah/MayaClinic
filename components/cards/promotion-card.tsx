import Link from "next/link"
import { Tag, Calendar, Gift } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Promotion } from "@/lib/types"

interface PromotionCardProps {
  promotion: Promotion
}

export function PromotionCard({ promotion }: PromotionCardProps) {
  const validUntil = new Date(promotion.validUntil)
  const isExpiringSoon =
    validUntil.getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000 // 30 days

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      {/* Image placeholder with discount badge */}
      <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
        <Gift className="h-16 w-16 text-primary/30" />
        {promotion.discount && (
          <Badge className="absolute right-4 top-4 bg-primary text-primary-foreground">
            {promotion.discount}
          </Badge>
        )}
      </div>
      <CardContent className="flex flex-1 flex-col pt-6">
        <Badge variant="secondary" className="mb-2 w-fit">
          {promotion.category}
        </Badge>
        <h3 className="mb-2 line-clamp-2 text-xl font-semibold text-foreground">
          {promotion.title}
        </h3>
        <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-3">
          {promotion.description}
        </p>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className={isExpiringSoon ? "text-destructive font-medium" : "text-muted-foreground"}>
            Valid until{" "}
            {validUntil.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </CardContent>
      <CardFooter className="gap-2 pt-0">
        <Button asChild variant="outline" className="flex-1">
          <Link href={`/promotions/${promotion.slug}`}>View Details</Link>
        </Button>
        <Button asChild className="flex-1">
          <Link href="/appointments">Book Now</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
