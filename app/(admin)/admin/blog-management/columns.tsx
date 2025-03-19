"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Row {
  imageUrl: string
  title: string
  published: boolean
  createdAt: string
  original: {
    id: string
    onView: (id: string) => void
    onEdit: (id: string) => void
    onDelete: (id: string) => void
  }
}

export const columns = [
  {
    header: "Image",
    accessor: "imageUrl",
    cell: ({ row }: { row: Row }) => (
      <div className="relative h-20 w-32 rounded-md overflow-hidden bg-gray-100">
        {row.imageUrl ? (
          <Image
            src={row.imageUrl}
            alt={row.title}
            fill
            className="object-cover"
            sizes="128px"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No image
          </div>
        )}
      </div>
    ),
  },
  { header: "Title", accessor: "title" },
  { header: "Category", accessor: "category" },
  { header: "Read Time", accessor: "readTime" },
  { 
    header: "Status", 
    accessor: "published",
    cell: ({ row }: { row: Row }) => (
      <Badge variant={row.published ? "default" : "secondary"}>
        {row.published ? "Published" : "Draft"}
      </Badge>
    ),
  },
  { 
    header: "Created At", 
    accessor: "createdAt",
    cell: ({ row }: { row: Row }) => new Date(row.createdAt).toLocaleDateString(),
  }
] 