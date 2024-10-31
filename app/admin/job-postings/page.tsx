"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/admin/DataTable";
import { Edit, Trash2 } from "lucide-react";
import Loader from "@/components/Loader";

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;

  postedDate: string;
}

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

  if (isLoading) return <Loader/>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
        Job Postings
      </h2>
      <Button onClick={() => router.push("/admin/job-postings/new")}>
        Add New Job Posting
      </Button>
      <DataTable
        columns={columns}
        data={jobPostings}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
