// app/dashboard/applications/page.tsx
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DataTable from "@/components/admin/DataTable";
import { Application } from "@/types/application";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { ViewApplicationModal } from "@/components/admin/ViewApplicationModal";

interface ApplicationResponse {
  applications: Application[];
}

export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewApplication, setViewApplication] = useState<Application | null>(null);

  const { data, isLoading, error } = useQuery<ApplicationResponse>({
    queryKey: ['userApplications'],
    queryFn: () => api.get('/applications').then(res => res.data),
  });

  const handleView = (id: string) => {
    const application = data?.applications.find(app => app.id === id);
    setViewApplication(application || null);
  };

  if (error) return <div>Failed to load applications</div>;
  if (isLoading) return <ApplicationsTableSkeleton />;

  const applications = data?.applications || [];

  const filteredApplications = applications.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
        My Applications
      </h2>
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
          { header: "Phone Number", accessor: "phoneNumber" },
          { header: "Position", accessor: "position" },
          { header: "Application Date", accessor: "appliedDate" },
          { header: "Status", accessor: "status" },
          { header: "COTS Experience", accessor: "cotsExperience" },
          { header: "SQL/JS Experience", accessor: "sqlJavaScriptExperience" },
          { header: "Report Dev Experience", accessor: "reportDevelopmentExperience" }
        ]}
        data={filteredApplications}
        onView={handleView}
      />
      <ViewApplicationModal
        application={viewApplication}
        isOpen={!!viewApplication}
        onClose={() => setViewApplication(null)}
      />
    </div>
  );
}

function ApplicationsTableSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-12 w-full" />
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  );
}