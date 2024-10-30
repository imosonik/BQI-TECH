"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Clock, CheckCircle, XCircle, Calendar } from "lucide-react";
import DashboardOverview from "../../components/user/DashboardOverview";
import Loader from "@/components/Loader";

// Assuming you have a type for the application status
interface ApplicationStatus {
  id: string;
  jobTitle: string;
  status: string; // Adjust this if you have specific statuses
  appliedDate: string;
  lastUpdated: string;
}

export default function Dashboard() {
  const [applications, setApplications] = useState<ApplicationStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('/api/admin/applications');
        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }
        const data = await response.json();
        
        // Ensure data is an array
        if (Array.isArray(data)) {
          setApplications(data);
        } else {
          console.error('Expected an array but got:', data);
          setApplications([]); // Set to empty array if not an array
        }
      } catch (error) {
        console.error(error);
        setApplications([]); // Set to empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const statusColor = (status: string) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-800";
      case "Under Review":
        return "bg-yellow-100 text-yellow-800";
      case "Interview Scheduled":
        return "bg-purple-100 text-purple-800";
      case "Offer Extended":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "Applied":
        return <Briefcase className="w-5 h-5" />;
      case "Shortlisted":
        return <Clock className="w-5 h-5" />;
      case "Interview Scheduled":
        return <Calendar className="w-5 h-5" />;
      case "Offer Extended":
        return <CheckCircle className="w-5 h-5" />;
      case "Rejected":
        return <XCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  if (isLoading)
    return (
      <Loader/>
    );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        Dashboard
      </h1>

      <DashboardOverview applications={applications} />

      <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
        Recent Applications
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {applications.slice(0, 3).map((app, index) => (
          <motion.div
            key={app.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{app.jobTitle}</h2>
              <div className="flex items-center mb-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center ${statusColor(
                    app.status
                  )}`}
                >
                  {statusIcon(app.status)}
                  <span className="ml-1">{app.status}</span>
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <p>Applied: {new Date(app.appliedDate).toLocaleDateString()}</p>
                <p>
                  Last Updated: {new Date(app.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
