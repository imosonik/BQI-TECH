"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AdminPageLayout } from "@/components/admin/AdminPageLayout";
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
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredData = jobPostings.filter((job) =>
    Object.values(job).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (isLoading) return <Loader/>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <AdminPageLayout
      title="Job Postings"
      searchPlaceholder="Search job postings..."
      searchValue={searchTerm}
      onSearch={setSearchTerm}
    >
      <div className="space-y-6">
        <div className="flex justify-end">
          <Button onClick={() => router.push("/admin/job-postings/new")}>
            Add New Job Posting
          </Button>
        </div>
        <div className="overflow-x-auto">
          <DataTable
            columns={columns}
            data={filteredData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </AdminPageLayout>
  );
}
