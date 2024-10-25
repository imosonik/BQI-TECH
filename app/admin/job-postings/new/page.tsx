"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { JobPosting } from "@/types/jobPosting";

export default function AddJobPostingPage() {
  const router = useRouter();
  const [jobPosting, setJobPosting] = useState<Omit<JobPosting, 'id' | 'postedDate'>>({
    title: "",
    department: "",
    location: "",
    description: "",
    requirements: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJobPosting((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/admin/job-postings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobPosting),
      });

      if (!response.ok) {
        throw new Error("Failed to create job posting");
      }

      router.push("/admin/job-postings");
    } catch (err) {
      setError("Failed to create job posting. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add New Job Posting</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
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
          <Button type="submit">Create Job Posting</Button>
        </div>
      </form>
    </div>
  );
}
