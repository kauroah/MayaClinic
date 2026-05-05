import { PageHeader } from '@/components/sections/page-header'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Документы и сертификаты - Maya Clinic',
  description: 'Документы и сертификаты Maya Clinic',
}

const documents = [
  {
    title: 'Лицензии',
    url: '/licenses',
  },
  {
    title: 'Закон РФ от 07.02.1992 N 2300-1 «О защите прав потребителей»',
    url: 'https://www.consultant.ru/document/cons_doc_LAW_305/',
  },
  {
    title: 'Политика в области защиты и обработки персональных данных',
    url: 'https://maya-clinic.com/privacy-policy',
  },
  {
    title: 'Права и обязанности граждан в сфере охраны здоровья',
    url: 'https://www.consultant.ru/document/cons_doc_LAW_121895/0e9c45270a637ce00f03a3c8a048ebec1f7a0c9d/',
  },
  {
    title:
      'Постановление Правительства РФ от 4 октября 2012 г. № 1006 «Об утверждении Правил предоставления медицинскими организациями платных медицинских услуг»',
    url: 'http://base.garant.ru/70237118/',
  },
  {
    title:
      'Постановление Правительства РФ от 10 декабря 2018 г. № 1506 «О программе государственных гарантий бесплатного оказания гражданам медицинской помощи»',
    url: 'https://maya-clinic.com/wp-content/uploads/2021/06/Yyi7zVAG88B1PKbJSYZA4Z4ByzaofHwe.pdf',
  },
  {
    title:
      'Постановление Кабинета Министров Республики Татарстан № 1256 «Программа госгарантий медицинской помощи»',
    url: 'http://www.fomsrt.ru/files2/%D0%9F%D0%9A%D0%9C%20%D0%BF%D0%BE%20%D0%9F%D0%93%D0%93%20%D0%BD%D0%B0%202019%20%D0%B3%D0%BE%D0%B4%20%D0%BE%D1%82%2029.12.2018%20%E2%84%961256.pdf',
  },
  {
    title:
      'Перечень жизненно необходимых и важнейших лекарственных препаратов',
    url: 'https://maya-clinic.com/wp-content/uploads/2021/06/8qGPVaoQtztDoiEqNojWTre2bB8QtV6w.pdf',
  },
]

export default function DocumentsPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="Документы и сертификаты Майя Клиник"
        description="Официальные документы и правовая информация"
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">

          {/* Title EXACT */}
          <h2 className="text-2xl font-bold mb-8">Документы</h2>

          <div className="space-y-4">
            {documents.map((doc, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border rounded-lg p-5 hover:shadow-md transition"
              >
                <span className="text-foreground text-sm md:text-base">
                  {doc.title}
                </span>

                <Button variant="outline" size="sm" asChild>
                  <a href={doc.url} target="_blank">
                    <Download className="w-4 h-4 mr-2" />
                    Открыть
                  </a>
                </Button>
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  )
}