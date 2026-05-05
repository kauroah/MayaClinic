"use client"

import { useState } from "react"
import { Star, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { doctors } from "@/lib/data/doctors"
import { services } from "@/lib/data/services"

interface ReviewsFormProps {
  onSuccess?: () => void
}

export default function ReviewsForm({ onSuccess }: ReviewsFormProps) {
  const [form, setForm] = useState({
    name: "",
    message: "",
    service: "",
    doctorName: "",
    rating: 5,
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const API_URL = process.env.NEXT_PUBLIC_API_URL


async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()
  setLoading(true)
  setError("")

  try {
    const res = await fetch(`${API_URL}/api/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    // 🔥 safer handling (avoid JSON crash)
    const contentType = res.headers.get("content-type")

    if (!res.ok || !contentType?.includes("application/json")) {
      const text = await res.text()
      console.error("Invalid response:", text)
      throw new Error("Ошибка сервера")
    }

    await res.json()

    setSuccess(true)
    setForm({
      name: "",
      message: "",
      service: "",
      doctorName: "",
      rating: 5,
    })

    onSuccess?.()
  } catch (err: any) {
    setError(err.message || "Ошибка отправки. Попробуйте позже.")
  } finally {
    setLoading(false)
  }
}

  if (success) {
    return (
      <div className="text-center py-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
          <Star className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Спасибо за отзыв!
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Ваш отзыв отправлен на проверку и скоро появится на сайте.
        </p>
        <div className="flex gap-2 justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSuccess(false)
              onSuccess?.()
            }}
          >
            Оставить ещё отзыв
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Ваше имя *</Label>
        <Input
          id="name"
          type="text"
          placeholder="Иван Иванов"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>

      {/* Service */}
      <div className="space-y-2">
        <Label htmlFor="service">Услуга *</Label>
        <select
          id="service"
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        >
          <option value="">Выберите услугу</option>
          {services.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Doctor */}
      <div className="space-y-2">
        <Label htmlFor="doctor">Врач *</Label>
        <select
          id="doctor"
          value={form.doctorName}
          onChange={(e) => setForm({ ...form, doctorName: e.target.value })}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        >
          <option value="">Выберите врача</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* Rating */}
      <div className="space-y-2">
        <Label>Оценка</Label>
        <div className="flex gap-1">
          {[5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setForm({ ...form, rating: star })}
              className={`text-2xl transition hover:scale-110 ${
                star <= form.rating ? "text-yellow-400" : "text-muted-foreground/30"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">Ваш отзыв *</Label>
        <Textarea
          id="message"
          placeholder="Поделитесь вашим опытом посещения клиники..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={4}
          required
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Отправка...
          </>
        ) : (
          "Отправить отзыв"
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        * Отзыв будет опубликован после проверки администратором
      </p>
    </form>
  )
}