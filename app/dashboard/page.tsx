"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Clock, CheckCircle, XCircle, Calendar } from "lucide-react";
import DashboardOverview from "../../components/user/DashboardOverview";

// Assuming you have a type for the application status
interface ApplicationStatus {
  id: string;
  jobTitle: string;
  status:
    | "Applied"
    | "Under Review"
    | "Interview Scheduled"
    | "Offer Extended"
    | "Rejected";
  appliedDate: string;
  lastUpdated: string;
}

export default function Dashboard() {
  const [applications, setApplications] = useState<ApplicationStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch application statuses here
    // For now, we'll use mock data
    const mockApplications: ApplicationStatus[] = [
      {
        id: "1",
        jobTitle: "Software Engineer",
        status: "Applied",
        appliedDate: "2023-05-01",
        lastUpdated: "2023-05-01",
      },
      {
        id: "2",
        jobTitle: "Product Manager",
        status: "Under Review",
        appliedDate: "2023-04-15",
        lastUpdated: "2023-04-20",
      },
      {
        id: "3",
        jobTitle: "Data Scientist",
        status: "Interview Scheduled",
        appliedDate: "2023-04-10",
        lastUpdated: "2023-05-02",
      },
      {
        id: "4",
        jobTitle: "UX Designer",
        status: "Offer Extended",
        appliedDate: "2023-03-25",
        lastUpdated: "2023-05-03",
      },
      {
        id: "5",
        jobTitle: "Marketing Specialist",
        status: "Rejected",
        appliedDate: "2023-04-05",
        lastUpdated: "2023-04-25",
      },
    ];
    setApplications(mockApplications);
    setIsLoading(false);
  }, []);

  const statusColor = (status: ApplicationStatus["status"]) => {
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
    }
  };

  const statusIcon = (status: ApplicationStatus["status"]) => {
    switch (status) {
      case "Applied":
        return <Briefcase className="w-5 h-5" />;
      case "Under Review":
        return <Clock className="w-5 h-5" />;
      case "Interview Scheduled":
        return <Calendar className="w-5 h-5" />;
      case "Offer Extended":
        return <CheckCircle className="w-5 h-5" />;
      case "Rejected":
        return <XCircle className="w-5 h-5" />;
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
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
