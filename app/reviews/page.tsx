"use client"

import { useEffect, useState } from "react"
import { Star, MessageSquare, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/sections/page-header"
import { TestimonialCard } from "@/components/cards/testimonial-card"
import ReviewsForm from "@/components/forms/reviews-form"

interface Review {
  id: string
  name: string
  message: string
  status: string
  createdAt: string
  service: string
  doctorName: string
  rating: number
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

 const API_URL = process.env.NEXT_PUBLIC_API_URL

useEffect(() => {
  fetchReviews()
}, [])

async function fetchReviews() {
  setLoading(true)

  try {
    const url = API_URL
      ? `${API_URL}/api/reviews`
      : "/api/reviews" // fallback (in case you later add proxy)

    const res = await fetch(url)

    // 🔥 handle non-JSON responses (VERY IMPORTANT)
    const contentType = res.headers.get("content-type")

    if (!res.ok || !contentType?.includes("application/json")) {
      const text = await res.text()
      console.error("Invalid response:", text)
      throw new Error("Invalid response from server")
    }

    const data = await res.json()

    const approved = (data.data || []).filter(
      (r: Review) => r.status === "approved"
    )

    setReviews(approved)
  } catch (err) {
    console.error("Failed to fetch reviews", err)
    setReviews([])
  } finally {
    setLoading(false)
  }
}

  function handleReviewSubmitted() {
    setTimeout(() => fetchReviews(), 1000)
  }

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0"

  return (
    <>
      <PageHeader
        title="Отзывы пациентов"
        description="Читайте настоящие отзывы пациентов о наших медицинских услугах."
        breadcrumbs={[{ label: "Отзывы" }]}
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Reviews Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Что говорят наши пациенты
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Мы ценим мнение каждого пациента. Ваши отзывы помогают нам становиться лучше.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Всего отзывов</p>
                        <p className="text-sm text-muted-foreground">
                          {loading ? "..." : reviews.length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Star className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Средняя оценка</p>
                        <p className="text-sm text-muted-foreground">
                          {averageRating} / 5
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Проверенные</p>
                        <p className="text-sm text-muted-foreground">
                          Все отзывы проходят проверку
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Star className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Оставить отзыв</p>
                        <a href="#review-form" className="text-sm text-muted-foreground hover:text-primary">
                          Написать отзыв
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="mb-4 font-semibold text-foreground">
                  Быстрые ссылки
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button asChild variant="outline" size="sm">
                    <a href="#reviews-list">Все отзывы</a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a href="/services">Наши услуги</a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a href="/doctors">Наши врачи</a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Review Form - Always visible */}
            <div id="review-form">
              <Card>
                <CardHeader>
                  <CardTitle>Оставьте отзыв</CardTitle>
                </CardHeader>
                <CardContent>
                  <ReviewsForm onSuccess={handleReviewSubmitted} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews List */}
      <section id="reviews-list" className="border-t border-border py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-2 text-2xl font-bold text-foreground">
            Все отзывы
          </h2>
          <p className="mb-8 text-muted-foreground">
            {reviews.length > 0
              ? `${reviews.length} отзывов от наших пациентов`
              : "Здесь появятся отзывы наших пациентов"}
          </p>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                      <div className="h-3 bg-muted rounded w-full"></div>
                      <div className="h-3 bg-muted rounded w-full"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12 border rounded-lg bg-muted/30">
              <Star className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                Отзывов пока нет
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Ваш отзыв может стать первым!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <TestimonialCard
                  key={review.id}
                  testimonial={{
                    id: review.id,
                    name: review.name,
                    text: review.message,
                    rating: review.rating || 5,
                    date: review.createdAt,
                    verified: true,
                    service: review.service,
                    doctorName: review.doctorName,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}