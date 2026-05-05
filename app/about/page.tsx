import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  Heart,
  Target,
  Eye,
  Award,
  Users,
  Clock,
  Shield,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/sections/page-header"
import { CTASection } from "@/components/sections/cta-section"

export const metadata: Metadata = {
  title: "О нас",
  description:
    "Узнайте о миссии, видении и стремлении Maya Clinic предоставлять исключительные медицинские услуги в России.",
  openGraph: {
    title: "О нас | Maya Clinic",
    description:
      "Узнайте о миссии, видении и стремлении Maya Clinic предоставлять исключительные медицинские услуги в России.",
  },
}

const values = [
  {
    icon: Heart,
    title: "Пациентоориентированная помощь",
    description:
      "Мы ставим пациентов во главу угла во всем, что делаем, обеспечивая персонализированный уход, учитывающий индивидуальные потребности.",
  },
  {
    icon: Award,
    title: "Превосходство",
    description:
      "Мы стремимся к совершенству в медицинской помощи, постоянно улучшая наши услуги и следуя современным медицинским достижениям.",
  },
  {
    icon: Users,
    title: "Сострадание",
    description:
      "Мы относимся к каждому пациенту с empathy, уважением и пониманием, создавая поддерживающую целительную среду.",
  },
  {
    icon: Shield,
    title: "Честность",
    description:
      "Мы поддерживаем высочайшие этические стандарты во всех наших взаимодействиях с пациентами, сотрудниками и обществом.",
  },
]

const milestones = [
  { year: "2004", event: "Основание Maya Clinic с видением обеспечения доступного качественного здравоохранения" },
  { year: "2008", event: "Расширение, включающее специализированные отделения: дерматологию и стоматологию" },
  { year: "2012", event: "Получение сертификата аккредитации больницы (HA)" },
  { year: "2016", event: "Открытие нового современного учреждения с передовым оборудованием" },
  { year: "2020", event: "Достижение сертификации ISO 9001:2015 по управлению качеством" },
  { year: "2024", event: "Празднование 20 лет служения обществу: более 50 000 пациентов" },
]

const whyChooseUs = [
  "Сертифицированные врачи с опытом работы",
  "Современные учреждения с передовыми технологиями",
  "Комплексные услуги под одной крышей",
  "Удобное расположение и продленный график работы",
  "Многоязычный персонал для международных пациентов",
  "Прямые расчеты с основными страховыми компаниями",
  "Теплая, гостеприимная атмосфера",
  "Приверженность удовлетворенности пациентов",
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="О Maya Clinic"
        description="Посвящены предоставлению исключительной медицинской помощи с состраданием и профессионализмом с 2004 года."
        breadcrumbs={[{ label: "О нас" }]}
      />

      {/* Миссия и Видение */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">
                  Наша миссия
                </h2>
                <p className="text-muted-foreground">
                  Обеспечивать доступные высококачественные медицинские услуги,
                  которые улучшают здоровье и благополучие наших пациентов и
                  общества. Мы стремимся предоставлять сострадательную,
                  пациентоориентированную помощь, используя новейшие медицинские
                  знания и технологии.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">
                  Наше видение
                </h2>
                <p className="text-muted-foreground">
                  Быть самым надежным поставщиком медицинских услуг в Бангкоке,
                  признанным за превосходство в медицинской помощи, инновации и
                  удовлетворенность пациентов. Мы стремимся установить стандарт
                  комплексных, сострадательных медицинских услуг.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Наша история */}
      <section className="bg-secondary/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Наша история
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  Maya Clinic была основана в 2004 году группой преданных своему делу
                  врачей, которые разделяли видение создания медицинского учреждения,
                  сочетающего медицинское совершенство с искренним состраданием.
                  Названная в честь санскритского слова, означающего «иллюзия» или
                  «магия», мы верим в преобразующую силу качественного здравоохранения.
                </p>
                <p>
                  То, что начиналось как небольшая семейная практика, выросло в
                  комплексный медицинский центр, обслуживающий тысячи
                  пациентов ежегодно. На протяжении всего нашего роста мы сохраняли
                  наши основополагающие принципы: ставить пациентов на первое место,
                  быть на передовой медицинских достижений и относиться к каждому человеку,
                  который входит в наши двери, с достоинством и уважением.
                </p>
                <p>
                  Сегодня Maya Clinic является домом для разнообразной команды специалистов,
                  охватывающих несколько медицинских дисциплин. Наше современное учреждение
                  оснащено новейшими диагностическими и лечебными технологиями,
                  что гарантирует нашим пациентам получение наилучшей возможной помощи.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative hidden lg:block">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
                  <Image
                    src="/about.png"
                    alt="Maya Clinic"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Основные ценности */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Наши основные ценности
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Эти ценности определяют всё, что мы делаем в Maya Clinic.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent className="pt-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Хронология */}
      <section className="bg-secondary/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Наш путь
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Ключевые вехи в истории Maya Clinic.
            </p>
          </div>
          <div className="mt-12">
            <div className="relative">
              <div className="absolute left-4 top-0 h-full w-0.5 bg-primary/20 md:left-1/2 md:-translate-x-1/2" />
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`relative flex items-center gap-4 md:gap-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="w-full md:w-1/2 md:text-right">
                      {index % 2 === 0 && (
                        <Card className="inline-block">
                          <CardContent className="p-4">
                            <p className="font-semibold text-primary">
                              {milestone.year}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {milestone.event}
                            </p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                    <div className="absolute left-4 flex h-4 w-4 items-center justify-center rounded-full bg-primary md:left-1/2 md:-translate-x-1/2">
                      <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                    </div>
                    <div className="w-full pl-8 md:w-1/2 md:pl-0 md:text-left">
                      {index % 2 !== 0 && (
                        <Card className="inline-block">
                          <CardContent className="p-4">
                            <p className="font-semibold text-primary">
                              {milestone.year}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {milestone.event}
                            </p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Почему выбирают нас */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Почему выбирают Maya Clinic?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Мы стремимся предоставлять исключительную медицинскую помощь,
                которая превосходит ваши ожидания.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {whyChooseUs.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-8">
                <Link href="/appointments">Записаться на прием</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <p className="text-4xl font-bold text-primary">20+</p>
                  <p className="text-sm text-muted-foreground">
                    Лет превосходства
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <p className="text-4xl font-bold text-primary">50K+</p>
                  <p className="text-sm text-muted-foreground">
                    Обслуженных пациентов
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <p className="text-4xl font-bold text-primary">15+</p>
                  <p className="text-sm text-muted-foreground">
                    Медицинских специалистов
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <p className="text-4xl font-bold text-primary">98%</p>
                  <p className="text-sm text-muted-foreground">
                    Уровень удовлетворенности
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}