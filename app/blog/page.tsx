import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog & Insights | BQI Tech',
  description: 'Stay updated with the latest insights, trends and news in government technology, digital transformation and IT solutions from BQI Tech.',
  keywords: ['tech blog', 'IT insights', 'digital transformation news', 'government tech updates'],
  alternates: {
    canonical: 'https://bqitech.com/blog'
  }
}

const blogPosts = [
  {
    id: 1,
    title: "Digital Transformation in Government: 2024 Trends",
    excerpt: "Explore the key digital transformation trends reshaping government services and operations in 2024.",
    date: "March 15, 2024",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    category: "Digital Transformation",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Cybersecurity Best Practices for Government Agencies",
    excerpt: "Essential cybersecurity measures and protocols for protecting government digital infrastructure.",
    date: "March 10, 2024",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    category: "Security",
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "Cloud Migration Strategies for Public Sector",
    excerpt: "A comprehensive guide to successful cloud migration for government agencies and public sector organizations.",
    date: "March 5, 2024",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop",
    category: "Cloud Computing",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "AI in Government Services: Use Cases and Implementation",
    excerpt: "How artificial intelligence is revolutionizing government service delivery and decision-making processes.",
    date: "February 28, 2024",
    imageUrl: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=2072&auto=format&fit=crop",
    category: "Artificial Intelligence",
    readTime: "7 min read"
  },
  {
    id: 5,
    title: "Modernizing Legacy Systems: A Step-by-Step Approach",
    excerpt: "Strategic approaches to upgrading legacy systems while maintaining operational continuity.",
    date: "February 20, 2024",
    imageUrl: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=2070&auto=format&fit=crop",
    category: "System Modernization",
    readTime: "10 min read"
  },
  {
    id: 6,
    title: "Data Privacy in Government: Compliance and Best Practices",
    excerpt: "Understanding data privacy regulations and implementing effective compliance measures in government operations.",
    date: "February 15, 2024",
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2032&auto=format&fit=crop",
    category: "Data Privacy",
    readTime: "9 min read"
  }
]

function BlogCard({ post }: { post: typeof blogPosts[0] }) {
  return (
    <Link href={`/blog/${post.id}`} className="group">
      <article className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48 w-full">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-sm font-medium text-white bg-[#31CDFF] rounded-full">
              {post.category}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
            <span>{post.date}</span>
            <span>•</span>
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

export default async function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#272055] to-[#31CDFF] text-transparent bg-clip-text">
          Blog & Insights
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Stay updated with the latest insights in government technology and digital transformation
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
} 