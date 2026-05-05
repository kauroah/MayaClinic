import Image from "next/image"
import Link from "next/link"
import { Star, User } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Doctor } from "@/lib/types"

interface DoctorCardProps {
  doctor: Doctor
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      {/* ✅ FIXED: Doctor Image instead of placeholder */}
<div className="relative h-48 overflow-hidden bg-secondary">
  {doctor.image ? (
    <Image
      src={doctor.image}
      alt={doctor.name}
      fill
      className="object-contain transition-transform duration-500 hover:scale-105" // Changed to object-contain
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
        <User className="h-12 w-12 text-primary" />
      </div>
    </div>
  )}
</div>
      
      <CardContent className="flex flex-1 flex-col pt-6">
        <Badge variant="secondary" className="mb-2 w-fit">
          {doctor.specialty}
        </Badge>
        <h3 className="mb-1 text-xl font-semibold text-foreground">
          {doctor.name}
        </h3>
        <p className="mb-2 text-sm text-primary">{doctor.title}</p>
        <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-3">
          {doctor.bio}
        </p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{doctor.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({doctor.reviewCount} reviews)
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {doctor.languages.map((lang) => (
            <Badge key={lang} variant="outline" className="text-xs">
              {lang}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="gap-2 pt-0">
        <Button asChild variant="outline" className="flex-1">
          <Link href={`/doctors/${doctor.slug}`}>Профиль</Link>
        </Button>
        <Button asChild className="flex-1">
          <Link href="/appointments">Записаться</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}