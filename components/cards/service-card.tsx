import Link from "next/link"
import {
  Stethoscope,
  Droplet,
  Bone,
  Ear,
  Activity,
  type LucideIcon,
} from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Service } from "@/lib/types"

const iconMap: Record<string, LucideIcon> = {
  Stethoscope,
  Droplet,
  Bone,
  Ear,
  Activity,
}

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  const IconComponent = iconMap[service.icon] || Stethoscope

  return (
    <Card className="flex h-full flex-col transition-shadow hover:shadow-lg">
      <CardContent className="flex flex-1 flex-col pt-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <IconComponent className="h-6 w-6 text-primary" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-foreground">
          {service.name}
        </h3>
        <p className="mb-4 flex-1 text-sm text-muted-foreground">
          {service.description}
        </p>
        {service.price && (
          <div className="mb-4">
            <span className="text-lg font-semibold text-primary">
              {service.price}
            </span>
            {service.priceNote && (
              <span className="ml-2 text-sm text-muted-foreground">
                {service.priceNote}
              </span>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link href={`/services/${service.slug}`}>Узнать больше</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
