import { PageHeader } from '@/components/sections/page-header'
import { ContactForm } from '@/components/forms/contact-form'
import { Card } from '@/components/ui/card'
import { Calendar, Clock, MapPin } from 'lucide-react'

export const metadata = {
  title: 'Запись на прием - Maya Clinic',
  description: 'Запишитесь на прием к нашим медицинским специалистам.',
}

export default function AppointmentsPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="Запись на прием"
        description="Запланируйте консультацию с нашей медицинской командой"
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Как записаться</h2>
              <div className="space-y-4">
                <Card className="p-4">
                  <div className="flex gap-3">
                    <Calendar className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Выберите услугу</h3>
                      <p className="text-sm text-muted-foreground">
                        Выберите тип необходимой консультации
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex gap-3">
                    <Clock className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Укажите свои данные</h3>
                      <p className="text-sm text-muted-foreground">
                        Заполните вашу контактную информацию
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex gap-3">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Подтверждение</h3>
                      <p className="text-sm text-muted-foreground">
                        Получите подтверждение и детали записи
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Запрос на запись</h2>
              <ContactForm isAppointmentForm={true} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}