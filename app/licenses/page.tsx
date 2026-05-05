import { PageHeader } from '@/components/sections/page-header'

export const metadata = {
  title: 'Лицензии - Maya Clinic',
  description: 'Лицензии на осуществление медицинской деятельности',
}

const licenses = [
  '/license/1.webp',
  '/license/2.jpg',
  '/license/3.jpg',
  '/license/4.webp',
]

export default function LicensesPage() {
  return (
    <main className="min-h-screen">
      <PageHeader
        title="Лицензии"
        description="Официальные лицензии медицинской деятельности"
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">

          {/* EXACT TITLE LIKE ORIGINAL */}
          <h2 className="text-2xl font-bold mb-8">Лицензии</h2>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {licenses.map((src, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg border bg-white"
              >
                <img
                  src={src}
                  alt={`Лицензия ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  )
}