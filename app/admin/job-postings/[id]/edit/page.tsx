"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { JobPosting } from "@/types/jobPosting";

export default function EditJobPostingPage() {
  const { id } = useParams();
  const router = useRouter();
  const [jobPosting, setJobPosting] = useState<JobPosting | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJobPosting() {
      if (id === "new") {
        setJobPosting({
          id: "",
          title: "",
          department: "",
          location: "",
          description: "",
          requirements: "",
          postedDate: new Date().toISOString(),
        });
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/admin/job-postings/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch job posting");
        }
        const data = await response.json();
        setJobPosting(data);
      } catch (err) {
        setError("Failed to load job posting. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchJobPosting();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJobPosting((prev) => ({ ...prev!, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobPosting) return;

    try {
      const url = id === "new" ? "/api/admin/job-postings" : `/api/admin/job-postings/${id}`;
      const method = id === "new" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobPosting),
      });

      if (!response.ok) {
        throw new Error("Failed to save job posting");
      }

      router.push("/admin/job-postings");
    } catch (err) {
      setError("Failed to save job posting. Please try again.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!jobPosting) return <div>Job posting not found</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">
        {id === "new" ? "Add New Job Posting" : "Edit Job Posting"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Job Title
          </label>
          <Input
            id="title"
            name="title"
            value={jobPosting.title}
            onChange={handleInputChange}
            className="mt-1"
            required
          />
        </div>
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <Input
            id="department"
            name="department"
            value={jobPosting.department}
            onChange={handleInputChange}
            className="mt-1"
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <Input
            id="location"
            name="location"
            value={jobPosting.location}
            onChange={handleInputChange}
            className="mt-1"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Job Description
          </label>
          <Textarea
            id="description"
            name="description"
            value={jobPosting.description}
            onChange={handleInputChange}
            className="mt-1"
            rows={5}
            required
          />
        </div>
        <div>
          <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
            Requirements
          </label>
          <Textarea
            id="requirements"
            name="requirements"
            value={jobPosting.requirements}
            onChange={handleInputChange}
            className="mt-1"
            rows={5}
            required
          />
        </div>
        <div className="flex justify-end space-x-3">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">Save Job Posting</Button>
        </div>
      </form>
    </div>
  );
}
