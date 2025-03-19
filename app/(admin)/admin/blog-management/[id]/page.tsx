"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { BlogPostForm } from "@/components/admin/BlogPostForm"
import { AdminPageLayout } from "@/components/admin/AdminPageLayout"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BlogPost {
  id?: string
  title: string
  excerpt: string
  content: string
  imageUrl: string
  category: string
  readTime: string
  published: boolean
}

export default function BlogPostEditor() {
  const { id } = useParams()
  const router = useRouter()
  const isNew = id === "new"

  const [isLoading, setIsLoading] = useState(false)
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    if (!isNew) {
      fetchBlogPost()
    }
  }, [id, isNew])

  const fetchBlogPost = async () => {
    try {
      const response = await fetch(`/api/admin/blog-posts/${id}`)
      if (!response.ok) throw new Error("Failed to fetch blog post")
      const data = await response.json()
      setBlogPost(data)
    } catch (error) {
      toast.error("Failed to fetch blog post")
      router.push("/admin/blog-management")
    }
  }

  const handleSubmit = async (data: BlogPost) => {
    setIsLoading(true)

    try {
      const url = isNew ? "/api/admin/blog-posts" : `/api/admin/blog-posts/${id}`
      const method = isNew ? "POST" : "PUT"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Failed to save blog post")

      toast.success("Blog post saved successfully")
      router.push("/admin/blog-management")
    } catch (error) {
      toast.error("Failed to save blog post")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isNew && !blogPost) {
    return <div>Loading...</div>
  }

  return (
    <AdminPageLayout title={isNew ? "Create Blog Post" : "Edit Blog Post"}>
      <div className="h-full space-y-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/admin/blog-management')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog Posts
          </Button>
        </div>

        <div className="max-w-4xl bg-white dark:bg-gray-800 rounded-lg p-6">
          <BlogPostForm 
            initialData={blogPost} 
            onSubmit={handleSubmit} 
          />
        </div>
      </div>
    </AdminPageLayout>
  )
} 