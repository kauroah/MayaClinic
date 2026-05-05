import { PageHeader } from '@/components/sections/page-header'
import { CTASection } from '@/components/sections/cta-section'
import { Card, CardContent } from '@/components/ui/card'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

export const metadata = {
  title: 'Уголок потребителя - Maya Clinic',
}

export default function ConsumerCornerPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="Уголок потребителя"
        description="Полная информация для пациентов и подготовка к обследованиям"
      />

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-10">

          {/* 🔹 MAIN INFO */}
          <Card>
            <CardContent className="p-6 space-y-3 text-sm leading-relaxed">
              <h2 className="text-xl font-bold">
                Информация о медицинской организации
              </h2>

              <p><b>Полное наименование:</b> ООО «Майя Клиник»</p>
              <p><b>Главный врач:</b> Аллуш Аднан Бурхан</p>
              <p><b>Дата регистрации:</b> 16.02.2016</p>
              <p><b>ОГРН:</b> 1161690067110</p>
              <p><b>ИНН/КПП:</b> 1655351114 / 165501001</p>
              <p><b>Адрес:</b> г. Казань, ул. Астрономическая, 8/21</p>
            </CardContent>
          </Card>

          {/* 🔹 RULES */}
          <Card>
            <CardContent className="p-6 text-sm">
              <h2 className="text-xl font-bold mb-3">
                Правила записи на прием
              </h2>

              <ul className="list-disc pl-5 space-y-2">
                <li>Запись осуществляется по телефону или лично</li>
                <li>Пациент оставляет контактный номер</li>
                <li>Администратор подтверждает запись</li>
                <li>Возможен перенос времени приема</li>
                <li>Можно записаться через сайт</li>
                <li>Пациент может отменить запись заранее</li>
              </ul>
            </CardContent>
          </Card>

          {/* 🔹 AUTHORITIES */}
          <Card>
            <CardContent className="p-6 text-sm space-y-2">
              <h2 className="text-xl font-bold">
                Контакты надзорных организаций
              </h2>

              <p>Минздрав РТ — г. Казань, ул. Островского, 11/6</p>
              <p>Росздравнадзор — ул. Нариманова, 63</p>
              <p>Роспотребнадзор — ул. Большая Красная, 30</p>
            </CardContent>
          </Card>

          {/* 🔥 LONG CONTENT → ACCORDION */}
          <Accordion type="single" collapsible>

            {/* BLOOD */}
            <AccordionItem value="blood">
              <AccordionTrigger>
                Подготовка к анализу крови
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Сдавать строго натощак (8–12 часов)</li>
                  <li>Можно пить только воду</li>
                  <li>Исключить алкоголь за 24 часа</li>
                  <li>Не курить за 1 час</li>
                  <li>Избегать физических нагрузок</li>
                  <li>Сообщить врачу о принимаемых лекарствах</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* URINE */}
            <AccordionItem value="urine">
              <AccordionTrigger>
                Подготовка к анализу мочи
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Использовать стерильный контейнер</li>
                  <li>Собирать утреннюю порцию</li>
                  <li>Провести гигиену</li>
                  <li>Не сдавать во время менструации</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* DAILY */}
            <AccordionItem value="daily">
              <AccordionTrigger>
                Суточный анализ мочи
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-sm">
                  Сбор мочи производится в течение суток в одну емкость.
                  Хранить в холодильнике. После завершения измерить общий объем
                  и передать часть в лабораторию.
                </p>
              </AccordionContent>
            </AccordionItem>

          </Accordion>

          {/* 🔥 PARTNERS */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6">
                Наши партнеры по ДМС
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                {/* Replace with real logos later */}
                {[
                  "partner1.webp",
                  "partner2.webp",
                  "partner3.webp",
                  "partner4.webp",
                  "partner5.webp",
                  "partner6.webp",
                ].map((img, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center border rounded-lg p-4 bg-white hover:shadow-md transition"
                  >
                    <img
                      src={`/partners/${img}`}
                      alt="partner"
                      className="h-16 md:h-30 w-auto object-contain"
                    />
                  </div>
                ))}

              </div>
            </CardContent>
          </Card>

        </div>
      </section>

      <CTASection />
    </main>
  )
}