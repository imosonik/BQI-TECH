"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminPageLayout } from "@/components/admin/AdminPageLayout"
import { useQuery } from "@tanstack/react-query"
import { BlogPostForm } from "@/components/admin/BlogPostForm"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  imageUrl: string
  category: string
  readTime: string
  published: boolean
}

export default function EditBlogPost({ params }: { params: { id: string } }) {
  const router = useRouter()

  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-post', params.id],
    queryFn: async () => {
      const res = await fetch(`/api/admin/blog-posts/${params.id}`)
      if (!res.ok) throw new Error('Failed to fetch post')
      return res.json()
    }
  })

  if (isLoading) return <div>Loading...</div>
  if (!post) return <div>Post not found</div>

  return (
    <AdminPageLayout title="Edit Blog Post">
      <BlogPostForm 
        initialData={post}
        onSubmit={async (data: Partial<BlogPost>) => {
          const res = await fetch(`/api/admin/blog-posts/${params.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
          
          if (!res.ok) throw new Error('Failed to update post')
          router.push('/admin/blog-management')
          router.refresh()
        }}
      />
    </AdminPageLayout>
  )
} 