"use client"

import Image from 'next/image'
import Link from 'next/link'
import useSWR from "swr"
import type { BlogPost } from "@/types/blog"

const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
})

function BlogCard({ post }: { post: BlogPost }) {
  // Helper function to ensure valid image URL
  const getImageUrl = (url: string) => {
    if (!url) return '/images/placeholder.jpg' // Add a placeholder image
    if (url.startsWith('http')) return url
    if (url.startsWith('/')) return url
    return `/${url}`
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48 w-full">
          <Image
            src={getImageUrl(post.imageUrl)}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-sm font-medium text-white bg-[#31CDFF] rounded-full">
              {post.category}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
            <time dateTime={new Date(post.createdAt).toISOString()}>
              {new Date(post.createdAt).toLocaleDateString()}
            </time>
            <span aria-hidden="true">•</span>
            <span>{post.readTime}</span>
          </div>
          
          <h3 className="text-xl font-bold mb-2 group-hover:text-[#31CDFF] transition-colors duration-300">
            {post.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
            {post.excerpt}
          </p>
        </div>
      </article>
    </Link>
  )
}

export default function BlogPage() {
  const { data: posts, isLoading } = useSWR<BlogPost[]>(
    '/api/blog-posts',
    fetcher,
    { refreshInterval: 30000 }
  )

  if (isLoading) return <div className="container mx-auto py-12">Loading...</div>

  const hasNoPosts = !posts || posts.length === 0

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="max-w-2xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#272055] to-[#31CDFF] text-transparent bg-clip-text pb-2">
          Blog & Insights
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Stay updated with the latest insights in government technology and digital transformation
        </p>
      </header>

      {hasNoPosts ? (
        <div className="text-center py-16">
          <div className="mb-6">
            <svg
              className="mx-auto h-24 w-24 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No Blog Posts Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
            Stay tuned! We're working on bringing you insightful articles about government technology and digital transformation.
          </p>
        </div>
      ) : (
        <>
          <section>
            <h2 className="sr-only">Latest Articles</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#272055] to-[#31CDFF] text-transparent bg-clip-text">
              Popular Categories
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {Array.from(new Set(posts.map(post => post.category))).map((category) => (
                <Link
                  key={category}
                  href={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[#31CDFF] hover:text-white transition-colors duration-300"
                >
                  {category}
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
} 