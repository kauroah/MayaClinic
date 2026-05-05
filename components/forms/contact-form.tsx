"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, Loader2 } from "lucide-react"

interface ContactFormProps {
  isAppointmentForm?: boolean
}

export function ContactForm({ isAppointmentForm = false }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const API_URL = process.env.NEXT_PUBLIC_API_URL

  if (!API_URL) {
    throw new Error("API URL not configured")
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
      type: isAppointmentForm ? "appointment" : "contact",
    }

    try {
    const response = await fetch(`${API_URL}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to send message')
      }

      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось отправить сообщение. Пожалуйста, попробуйте снова.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">
          {isAppointmentForm ? "Запрос на запись отправлен!" : "Сообщение отправлено!"}
        </h3>
        <p className="mt-2 text-muted-foreground">
          {isAppointmentForm
            ? "Спасибо за ваш запрос на запись. Мы скоро подтвердим вашу запись."
            : "Спасибо, что связались с нами. Мы скоро ответим вам."}
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setIsSubmitted(false)}
        >
          {isAppointmentForm ? "Отправить еще запрос" : "Отправить еще сообщение"}
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Имя *</Label>
          <Input
            id="contact-name"
            name="name"
            placeholder="Ваше имя"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">Эл. почта *</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            placeholder="your@email.com"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-phone">Телефон *</Label>
        <Input
          id="contact-phone"
          name="phone"
          type="tel"
          placeholder="+7 (555) 123-4567"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">
          {isAppointmentForm ? "Дополнительная информация" : "Сообщение"} *
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          placeholder={
            isAppointmentForm
              ? "Расскажите нам о предпочтительном времени записи и любых конкретных вопросах..."
              : "Чем мы можем вам помочь?"
          }
          rows={5}
          required
        />
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isAppointmentForm ? "Отправка..." : "Отправка..."}
          </>
        ) : isAppointmentForm ? (
          "Отправить запрос"
        ) : (
          "Отправить сообщение"
        )}
      </Button>
    </form>
  )
}