"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { JobPosting } from "@/types/jobPosting";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/ui/Modal";

export default function JobPostingsPage() {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
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
    { header: "Requirements", accessor: "requirements" },
  ];

  const handleEdit = (id: string) => {
    router.push(`/admin/job-postings/${id}/edit`);
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        const response = await fetch(`/api/admin/job-postings/${deleteId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete job posting");
        }
        setJobPostings(jobPostings.filter((posting) => posting.id !== deleteId));
      } catch (err) {
        setError("Failed to delete job posting. Please try again.");
      } finally {
        setIsModalOpen(false);
        setDeleteId(null);
      }
    }
  };

  const openModal = (id: string) => {
    setDeleteId(id);
    setIsModalOpen(true);
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
      <DataTable
        columns={columns}
        data={jobPostings}
        onEdit={handleEdit}
        onDelete={openModal}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Job Posting"
        message="Are you sure you want to delete this job posting?"
      />
    </div>
  );
}
