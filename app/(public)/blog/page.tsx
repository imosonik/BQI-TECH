"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from "@tanstack/react-query"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  imageUrl: string
  category: string
  readTime: string
  slug: string
  published: boolean
  createdAt: string
}

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
  const { data: posts, isLoading } = useQuery({
    queryKey: ['public-blog-posts'],
    queryFn: async () => {
      const res = await fetch('/api/blog-posts')
      if (!res.ok) throw new Error('Failed to fetch posts')
      return res.json()
    }
  })

  if (isLoading) return <div className="container mx-auto py-12">Loading...</div>

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="max-w-2xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#272055] to-[#31CDFF] text-transparent bg-clip-text">
          Blog & Insights
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Stay updated with the latest insights in government technology and digital transformation
        </p>
      </header>

      <section>
        <h2 className="sr-only">Latest Articles</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts?.map((post: BlogPost) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#272055] to-[#31CDFF] text-transparent bg-clip-text">
          Popular Categories
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {(Array.from(new Set(posts?.map((post: BlogPost) => post.category) || [])) as string[]).map((category) => (
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
    </div>
  )
} 