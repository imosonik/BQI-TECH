// app/dashboard/applications/page.tsx
"use client";

import { useState } from "react";
import useSWR from "swr";
import DataTable from "@/components/admin/DataTable";
import { Application } from "@/types/application"; // Adjust the import based on your types

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: applications = [], error } = useSWR<Application[]>("/api/admin/applications", fetcher);

  if (error) return <div>Failed to load applications</div>;
  if (!applications) return <div>Loading...</div>;

  const filteredApplications = Array.isArray(applications) ? applications.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.position.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">My Applications</h2>
      <input
        type="text"
        placeholder="Search applications..."
        className="w-full p-2 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <DataTable
        columns={[
          { header: "Name", accessor: "name" },
          { header: "Email", accessor: "email" },
          { header: "Position", accessor: "position" },
          { header: "Application Date", accessor: "appliedDate" },
          { header: "Status", accessor: "status" },
        ]}
        data={filteredApplications}
      />
    </div>
  );
}