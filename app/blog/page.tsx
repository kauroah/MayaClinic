import type { Metadata } from "next"
import { PageHeader } from "@/components/sections/page-header"
import { BlogCard } from "@/components/cards/blog-card"
import { CTASection } from "@/components/sections/cta-section"
import { blogPosts } from "@/lib/data/blog-posts"

export const metadata: Metadata = {
  title: "Блог о здоровье",
  description:
    "Будьте в курсе последних советов по здоровью, медицинских открытий и рекомендаций по здоровому образу жизни от врачей-экспертов Maya Clinic.",
  openGraph: {
    title: "Блог о здоровье | Maya Clinic",
    description:
      "Будьте в курсе последних советов по здоровью, медицинских открытий и рекомендаций по здоровому образу жизни от врачей-экспертов Maya Clinic.",
  },
}

export default function BlogPage() {
  // Group posts by category
  const categories = Array.from(new Set(blogPosts.map((p) => p.category)))

  // Sort posts by date (newest first)
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <>
      <PageHeader
        title="Блог о здоровье"
        description="Будьте в курсе последних советов по здоровью, медицинских открытий и рекомендаций по здоровому образу жизни от наших врачей-экспертов."
        breadcrumbs={[{ label: "Блог" }]}
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Featured Post */}
          {sortedPosts[0] && (
            <div className="mb-16">
              <h2 className="mb-8 text-2xl font-bold text-foreground">
                Последняя статья
              </h2>
              <div className="grid md:grid-cols-2">
                <BlogCard post={sortedPosts[0]} />
              </div>
            </div>
          )}

          {/* All Posts */}
          <div>
            <h2 className="mb-8 text-2xl font-bold text-foreground">
              Все статьи
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Есть вопросы о здоровье?"
        description="Наша команда экспертов готова помочь. Запишитесь на консультацию сегодня."
      />
    </>
  )
}