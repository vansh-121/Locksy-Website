import Link from "next/link"
import type { BlogPost, BlogPostSummary } from "@/lib/blog-data"
import { ArrowUpRight } from "lucide-react"
import SectionHeading from "@/components/section-heading"

interface LatestBlogPostsProps {
  posts: (BlogPost | BlogPostSummary)[]
}

export default function LatestBlogPosts({ posts }: LatestBlogPostsProps) {
  const latestPosts = [...posts]
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, 3)

  if (latestPosts.length === 0) return null

  return (
    <section className="relative py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Blog"
            title="Guides on browser privacy"
            description="Practical how-tos on locking tabs, protecting web apps and staying private on shared computers."
          />
          <Link href="/blog" className="btn-secondary h-10 flex-shrink-0 px-5">
            All articles <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {latestPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="surface group flex flex-col overflow-hidden transition-colors hover:border-foreground/20"
            >
              <div className="m-2 mb-0 aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-muted">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="text-foreground/80">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={post.publishDate}>
                    {new Date(post.publishDate.replace(/-/g, "/")).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-snug text-foreground">{post.title}</h3>
                <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
