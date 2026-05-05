import Link from "next/link"
import { Calendar, Clock, FileText } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { BlogPost } from "@/lib/types"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
      {/* Image placeholder */}
      <div className="flex h-48 items-center justify-center bg-secondary">
        <FileText className="h-12 w-12 text-primary/30" />
      </div>
      <CardContent className="flex flex-1 flex-col pt-6">
        <Badge variant="secondary" className="mb-2 w-fit">
          {post.category}
        </Badge>
        <h3 className="mb-2 line-clamp-2 text-xl font-semibold text-foreground">
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-primary transition-colors"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readTime}
          </span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link href={`/blog/${post.slug}`}>Read Article</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
