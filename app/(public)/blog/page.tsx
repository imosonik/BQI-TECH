"use client"

import Image from 'next/image'
import Link from 'next/link'
import useSWR from "swr"
import { motion } from "framer-motion"
import type { BlogPost } from "@/types/blog"
import { ArrowRight } from "lucide-react"

// Helper function to ensure valid image URL
const getImageUrl = (url: string) => {
  if (!url) return '/images/placeholder.jpg'
  if (url.startsWith('http')) return url
  if (url.startsWith('/')) return url
  return `/${url}`
}

const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
})

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <article className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={getImageUrl(post.imageUrl)}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 95vw, (max-width: 768px) 45vw, 30vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-4 left-4">
              <span className="px-4 py-1.5 text-sm font-medium text-white bg-[#31CDFF] rounded-full">
                {post.category}
              </span>
            </div>
          </div>
          
          <div className="p-4 sm:p-6 flex flex-col flex-grow">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
              <time dateTime={new Date(post.createdAt).toISOString()} className="font-medium">
                {new Date(post.createdAt).toLocaleDateString()}
              </time>
              <span aria-hidden="true" className="hidden sm:inline">•</span>
              <span className="font-medium">{post.readTime}</span>
            </div>
            
            <h3 className="text-lg sm:text-xl font-bold mb-3 group-hover:text-[#31CDFF] transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 text-sm sm:text-base flex-grow">
              {post.excerpt}
            </p>

            <div className="flex items-center text-[#31CDFF] font-medium group-hover:translate-x-2 transition-transform duration-300 text-sm sm:text-base">
              Read More <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}

export default function BlogPage() {
  const { data: posts, isLoading } = useSWR<BlogPost[]>(
    '/api/blog-posts',
    fetcher,
    { refreshInterval: 30000 }
  )

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#31CDFF]"></div>
        </div>
      </div>
    )
  }

  const latestPost = posts?.[0]
  const otherPosts = posts?.slice(1) || []

  return (
    <div className="w-full">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <motion.header 
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-[#31CDFF]/5 backdrop-blur-sm px-6 py-2 rounded-full mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#31CDFF] animate-pulse" />
            <span className="text-[#31CDFF] font-semibold tracking-wider text-sm">
              LATEST UPDATES
            </span>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#272055] to-[#31CDFF] text-transparent bg-clip-text pb-2">
            Blog & Insights
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stay updated with the latest insights in government technology and digital transformation
          </p>
        </motion.header>

        {latestPost && (
          <motion.section 
            className="mb-16 sm:mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href={`/blog/${latestPost.slug}`} className="group block">
              <article className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={getImageUrl(latestPost.imageUrl)}
                    alt={latestPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1400px) 95vw, 1400px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 text-sm text-white/90">
                      <span className="px-4 py-1.5 bg-[#31CDFF] rounded-full font-medium">
                        {latestPost.category}
                      </span>
                      <time dateTime={new Date(latestPost.createdAt).toISOString()} className="font-medium">
                        {new Date(latestPost.createdAt).toLocaleDateString()}
                      </time>
                      <span className="hidden sm:inline">•</span>
                      <span className="font-medium">{latestPost.readTime}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white group-hover:text-[#31CDFF] transition-colors duration-300">
                      {latestPost.title}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-200 mb-6 max-w-3xl line-clamp-2 sm:line-clamp-none">
                      {latestPost.excerpt}
                    </p>
                    <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium group-hover:bg-[#31CDFF] transition-all duration-300">
                      Read Full Article <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </motion.section>
        )}

        <section className="mb-20">
          <motion.h2 
            className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Latest Articles
          </motion.h2>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {otherPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        <motion.section 
          className="mt-16 sm:mt-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 bg-gradient-to-r from-[#272055] to-[#31CDFF] text-transparent bg-clip-text">
            Popular Categories
          </h2>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {Array.from(new Set(posts?.map(post => post.category))).map((category) => (
              <Link
                key={category}
                href={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-5 py-2.5 rounded-full bg-white dark:bg-gray-800 hover:bg-[#31CDFF] hover:text-white shadow-md hover:shadow-xl transition-all duration-300 text-gray-700 dark:text-gray-300 text-sm sm:text-base font-medium"
              >
                {category}
              </Link>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
} 