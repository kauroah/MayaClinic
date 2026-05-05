import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, Clock, User, Tag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BlogCard } from "@/components/cards/blog-card"
import { CTASection } from "@/components/sections/cta-section"
import {
  blogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/lib/data/blog-posts"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: "Article Not Found",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Maya Clinic Blog`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedBlogPosts(slug, 3)

  return (
    <>
      {/* Article Header */}
      <section className="bg-secondary/50 py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <Badge variant="secondary" className="mb-4">
            {post.category}
          </Badge>

          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
              {post.authorRole && (
                <span className="text-xs">({post.authorRole})</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">
            {post.content.split("\n\n").map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2 key={i} className="mt-8 text-2xl font-bold text-foreground">
                    {block.replace("## ", "")}
                  </h2>
                )
              }
              if (block.startsWith("### ")) {
                return (
                  <h3 key={i} className="mt-6 text-xl font-semibold text-foreground">
                    {block.replace("### ", "")}
                  </h3>
                )
              }
              if (block.startsWith("- ") || block.startsWith("* ")) {
                const items = block.split("\n").filter((line) => line.trim())
                return (
                  <ul key={i} className="mt-4 space-y-2">
                    {items.map((item, j) => (
                      <li key={j} className="text-muted-foreground">
                        {item.replace(/^[-*]\s*\*\*/, "").replace(/\*\*.*$/, "")}
                        {item.includes("**") && (
                          <strong className="text-foreground">
                            {item.match(/\*\*(.*?)\*\*/)?.[1]}
                          </strong>
                        )}
                        {item.replace(/^.*\*\*[^*]*\*\*\s*-?\s*/, "")}
                      </li>
                    ))}
                  </ul>
                )
              }
              if (block.match(/^\d\./)) {
                const items = block.split("\n").filter((line) => line.trim())
                return (
                  <ol key={i} className="mt-4 list-decimal space-y-2 pl-6">
                    {items.map((item, j) => (
                      <li key={j} className="text-muted-foreground">
                        {item.replace(/^\d+\.\s*\*\*/, "").replace(/\*\*.*/, "")}
                        {item.includes("**") && (
                          <strong className="text-foreground">
                            {item.match(/\*\*(.*?)\*\*/)?.[1]}
                          </strong>
                        )}
                        {item.replace(/^.*\*\*[^*]*\*\*\s*-?\s*/, "")}
                      </li>
                    ))}
                  </ol>
                )
              }
              return (
                <p key={i} className="mt-4 text-muted-foreground">
                  {block}
                </p>
              )
            })}
          </div>

          {/* Tags */}
          <div className="mt-12 border-t border-border pt-8">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Tags:</span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Author Card */}
          <Card className="mt-8">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-secondary">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{post.author}</p>
                {post.authorRole && (
                  <p className="text-sm text-muted-foreground">
                    {post.authorRole}
                  </p>
                )}
                <p className="mt-1 text-sm text-muted-foreground">
                  Expert healthcare insights from our medical team.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-border py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-bold text-foreground">
              Related Articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title="Have Health Questions?"
        description="Our expert team is here to help. Book a consultation today."
      />
    </>
  )
}
