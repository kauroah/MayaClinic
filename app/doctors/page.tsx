import type { Metadata } from "next"
import { PageHeader } from "@/components/sections/page-header"
import { DoctorCard } from "@/components/cards/doctor-card"
import { CTASection } from "@/components/sections/cta-section"
import Image from "next/image"

import { doctors, getAdministration, getMedicalStaff } from "@/lib/data/doctors"

export const metadata: Metadata = {
  title: "Наша команда",
  description:
    "Познакомьтесь с нашей профессиональной командой врачей, медицинского персонала и администрации Maya Clinic.",
  openGraph: {
    title: "Наша команда | Maya Clinic",
    description:
      "Врачи, медицинский персонал и администрация Maya Clinic.",
  },
}

export default function DoctorsPage() {
  const medicalStaff = getMedicalStaff()
  const administration = getAdministration()

  return (
    <>
      <PageHeader
        title="Наша команда"
        description="Наша команда профессионалов обеспечивает высокий уровень медицинской помощи, заботу и комфорт для каждого пациента."
        breadcrumbs={[{ label: "Наша команда" }]}
      />

      {/* 👨‍⚕️ Doctors */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-foreground">
            Врачи
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>
      
      {/* 🧑‍💼 Administration */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-foreground">
            Администрация
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {administration.map((member) => (
              <div
                key={member.id}
                className="rounded-xl border border-border p-4 bg-background hover:shadow-sm transition"
              >
                <div className="flex items-center gap-4">
                  
                  {/* Avatar */}
                  <div className="relative h-12 w-12 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div>
                    <p className="font-semibold text-foreground">
                      {member.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {member.position}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Готовы записаться?"
        description="Свяжитесь с нами или запишитесь на прием к нужному специалисту."
      />
    </>
  )
}