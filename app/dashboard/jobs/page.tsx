// app/dashboard/jobs/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DataTable from "@/components/admin/DataTable";
import { JobPosting } from "@/types/jobPosting"; // Adjust the import based on your types
import Loader from "@/components/Loader";

export default function JobListingsPage() {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchJobPostings = async () => {
      const response = await fetch("/api/admin/job-postings");
      const data = await response.json();
      setJobPostings(data);
      setIsLoading(false);
    };

    fetchJobPostings();
  }, []);

  if (isLoading) return <Loader />;

  const handleApply = (jobId: string) => {
    router.push(`/careers/apply/${jobId}`); // Navigate to the application form
  };

  const handleView = (jobId: string) => {
    router.push(`/careers/job/${jobId}`); // Navigate to the job details page
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
        Job Listings
      </h2>
      <DataTable
        columns={[
          { header: "Title", accessor: "title" },
          { header: "Department", accessor: "department" },
          { header: "Location", accessor: "location" },
          { header: "Posted Date", accessor: "postedDate" },
          { header: "Requirements", accessor: "requirements" },
        ]}
        data={jobPostings}
        onApply={handleApply}
        onView={handleView}
      />
    </div>
  );
}
