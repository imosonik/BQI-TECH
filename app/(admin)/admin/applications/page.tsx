"use client";

import { useState, useEffect } from "react";

import DataTable from "@/components/admin/DataTable";
import useSWR from "swr";
import { EditApplicationModal } from "@/components/admin/EditApplicationModal";
import { ViewApplicationModal } from "@/components/admin/ViewApplicationModal";
import { DeleteApplicationModal } from "@/components/admin/DeleteApplicationModal";
import { Application } from "@/types/application";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

const columns = [
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Phone Number", accessor: "phoneNumber" },
  { header: "Position", accessor: "position" },
  { header: "Applied Date", accessor: "appliedDate" },
  { header: "Status", accessor: "status" },
  { header: "COTS Experience", accessor: "cotsExperience" },
  { header: "SQL/JS Experience", accessor: "sqlJavaScriptExperience" },
  { header: "Report Dev Experience", accessor: "reportDevelopmentExperience" },
  { header: "Hear About", accessor: "hearAbout" },
  { header: "Other Source", accessor: "otherSource" },
  { header: "Experience", accessor: "experience" },
  { header: "Salary", accessor: "salary" }
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const { data, error, isLoading } = useSWR<
    Application[] | { applications: Application[] }
  >("/api/admin/applications", fetcher);
  const [applications, setApplications] = useState<Application[]>([]);
  const [viewApplication, setViewApplication] = useState<Application | null>(null);
  const [editApplication, setEditApplication] = useState<Application | null>(null);
  const [deleteApplicationId, setDeleteApplicationId] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      if (Array.isArray(data)) {
        setApplications(data);
      } else if (data.applications && Array.isArray(data.applications)) {
        setApplications(data.applications);
      } else {
        console.error("Unexpected data format:", data);
        setApplications([]);
      }
    }
  }, [data]);

  if (error) return <div>Failed to load applications</div>;
  if (isLoading) return <div>Loading...</div>;

  const filteredApplications = applications.filter((app) =>
    (selectedPosition ? app.position === selectedPosition : true) &&
    (selectedStatus ? app.status === selectedStatus : true) &&
    (app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  function handleView(id: string) {
    const application = applications.find((app) => app.id === id);
    setViewApplication(application || null);
  }

  function handleEdit(id: string) {
    const application = applications.find((app) => app.id === id);
    setEditApplication(application || null);
  }

  function handleDelete(id: string) {
    setDeleteApplicationId(id);
  }

  async function handleSaveEdit(updatedApplication: Application) {
    try {
      await fetch(`/api/admin/applications/${updatedApplication.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedApplication),
      });
      const updatedApplications = applications.map((app) =>
        app.id === updatedApplication.id ? updatedApplication : app
      );
      setApplications(updatedApplications);
      setEditApplication(null);
    } catch (error) {
      console.error("Failed to update application:", error);
    }
  }

  async function handleConfirmDelete(id: string) {
    try {
      await fetch(`/api/admin/applications/${id}`, { method: "DELETE" });
      const updatedApplications = applications.filter((app) => app.id !== id);
      setApplications(updatedApplications);
      setDeleteApplicationId(null);
    } catch (error) {
      console.error("Failed to delete application:", error);
    }
  }

  return (
    <>
      <AdminPageHeader title="Applications" breadcrumb="Applications" />
      
      {/* Sticky Search and Filter Section */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b">
        <div className="p-4 max-w-[2000px] mx-auto">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search by name, email or position..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            
            <div className="flex flex-row gap-3 md:w-auto">
              <select
                className="w-full md:w-48 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
              >
                <option value="">All Positions</option>
                {[...new Set(applications.map((app) => app.position))].map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
              
              <select
                className="w-full md:w-48 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="New">New</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Application">Application</option>
                <option value="Disqualified">Disqualified</option>
                <option value="Hired">Hired</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <DataTable
            columns={columns}
            data={filteredApplications}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {/* Modals */}
        <ViewApplicationModal
          application={viewApplication}
          isOpen={!!viewApplication}
          onClose={() => setViewApplication(null)}
        />
        <EditApplicationModal
          application={editApplication}
          isOpen={!!editApplication}
          onClose={() => setEditApplication(null)}
          onSave={handleSaveEdit}
        />
        <DeleteApplicationModal
          applicationId={deleteApplicationId}
          isOpen={!!deleteApplicationId}
          onClose={() => setDeleteApplicationId(null)}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </>
  );
}
