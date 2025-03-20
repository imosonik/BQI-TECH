"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { AdminPageLayout } from "@/components/admin/AdminPageLayout"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import DataTable from "@/components/admin/DataTable"
import { columns } from "./columns"
import { DeletePostDialog } from "@/components/admin/delete-post-dialog"
import { toast } from "sonner"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  imageUrl: string
  category: string
  readTime: string
  published: boolean
  createdAt: string
}

export default function BlogManagementPage() {
  const [deletePost, setDeletePost] = useState<{ id: string; title: string } | null>(null)
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const res = await fetch('/api/admin/blog-posts')
      if (!res.ok) throw new Error('Failed to fetch posts')
      return res.json() as Promise<BlogPost[]>
    }
  })

  const handleDelete = async (id: string, title: string) => {
    setDeletePost({ id, title })
  }

  const confirmDelete = async () => {
    if (!deletePost) return

    const res = await fetch(`/api/admin/blog-posts/${deletePost.id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] })
      toast.success('Post deleted successfully')
    } else {
      toast.error('Failed to delete post')
    }
    
    setDeletePost(null)
  }

  const postsWithActions = posts?.map(post => ({
    ...post,
    onView: () => router.push(`/admin/blog-management/${post.id}`),
    onEdit: () => router.push(`/admin/blog-management/${post.id}`),
    onDelete: () => handleDelete(post.id, post.title)
  })) || []

  return (
    <AdminPageLayout title="Blog Management">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Button onClick={() => router.push('/admin/blog-management/new')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Post
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={postsWithActions}
        isLoading={isLoading}
      />

      <DeletePostDialog
        isOpen={!!deletePost}
        onClose={() => setDeletePost(null)}
        onConfirm={confirmDelete}
        postTitle={deletePost?.title || ''}
      />
    </AdminPageLayout>
  )
} 