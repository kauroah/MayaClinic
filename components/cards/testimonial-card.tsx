import { Star, Quote, BadgeCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Testimonial } from "@/lib/types"

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col pt-6">
        <Quote className="mb-4 h-8 w-8 text-primary/30" />
        <p className="mb-4 flex-1 text-muted-foreground">{testimonial.text}</p>
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < testimonial.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-border pt-4">
          <div>
            <p className="font-medium text-foreground flex items-center gap-2">
              {testimonial.name}
              {testimonial.verified && (
                <BadgeCheck className="h-4 w-4 text-primary" />
              )}
            </p>
            {testimonial.service && (
              <p className="text-sm text-muted-foreground">
                {testimonial.service}
              </p>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {new Date(testimonial.date).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
