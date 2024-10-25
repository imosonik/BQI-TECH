"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { JobPosting } from "@/types/jobPosting";
import DataTable from "@/components/admin/DataTable";
import { Edit, Trash2 } from "lucide-react";

export default function JobPostingsPage() {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchJobPostings() {
      try {
        const response = await fetch("/api/admin/job-postings");
        if (!response.ok) {
          throw new Error("Failed to fetch job postings");
        }
        const data = await response.json();
        setJobPostings(data);
      } catch (err) {
        setError("Failed to load job postings. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchJobPostings();
  }, []);

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Department", accessor: "department" },
    { header: "Location", accessor: "location" },
    { header: "Posted Date", accessor: "postedDate" },
    {
      header: "Actions",
      accessor: "actions",
      Cell: ({ row }: { row: JobPosting }) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEdit(row.id)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(row.id)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleEdit = (id: string) => {
    router.push(`/admin/job-postings/${id}/edit`);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this job posting?")) {
      try {
        const response = await fetch(`/api/admin/job-postings/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete job posting");
        }
        setJobPostings(jobPostings.filter((posting) => posting.id !== id));
      } catch (err) {
        setError("Failed to delete job posting. Please try again.");
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
        Job Postings
      </h2>
      <Button onClick={() => router.push("/admin/job-postings/new")}>
        Add New Job Posting
      </Button>
      <DataTable columns={columns} data={jobPostings} />
    </div>
  );
}
