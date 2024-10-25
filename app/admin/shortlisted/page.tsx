"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import DataTable from "@/components/admin/DataTable";
import useSWR from "swr";
import { EditApplicationModal } from "@/components/admin/EditApplicationModal";
import { ViewApplicationModal } from "@/components/admin/ViewApplicationModal";
import { DeleteApplicationModal } from "@/components/admin/DeleteApplicationModal";
import {
  ShortlistedCandidate,
  ApiResponse,
  Application,
} from "@/types/application";

const columns = [
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Position", accessor: "position" },
  { header: "Shortlisted Date", accessor: "shortlistedDate" },
  { header: "Status", accessor: "status" },
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ShortlistedPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, error, isLoading } = useSWR<ApiResponse>(
    "/api/admin/applications?status=Shortlisted",
    fetcher
  );
  const [viewApplication, setViewApplication] =
    useState<ShortlistedCandidate | null>(null);
  const [editApplication, setEditApplication] =
    useState<ShortlistedCandidate | null>(null);
  const [deleteApplicationId, setDeleteApplicationId] = useState<string | null>(
    null
  );

  const handleView = (id: string) => {
    const application = shortlistedCandidates.find((app) => app.id === id);
    setViewApplication(application || null);
  };

  const handleEdit = (id: string) => {
    const application = shortlistedCandidates.find((app) => app.id === id);
    setEditApplication(application || null);
  };

  const handleDelete = (id: string) => {
    setDeleteApplicationId(id);
  };

  const handleSaveEdit = async (updatedApplication: Application) => {
    try {
      await fetch(`/api/admin/applications/${updatedApplication.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedApplication),
      });
      setEditApplication(null);
    } catch (error) {
      console.error("Failed to update application:", error);
    }
  };

  const handleConfirmDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/applications/${id}`, { method: "DELETE" });
      setDeleteApplicationId(null);
    } catch (error) {
      console.error("Failed to delete application:", error);
    }
  };

  const shortlistedCandidates = data?.applications || [];

  const filteredData = shortlistedCandidates.filter(
    (item: ShortlistedCandidate) =>
      Object.values(item).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
      })
  );

  if (error) return <div>Failed to load shortlisted candidates</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
        Shortlisted Candidates
      </h2>
      <div className="relative">
        <input
          type="text"
          placeholder="Search shortlisted candidates..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" />
      </div>
      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={filteredData}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
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
  );
}
