"use client";

import { motion } from 'framer-motion';
import { FileText, CheckCircle, Clock, XCircle } from 'lucide-react';

interface DashboardOverviewProps {
  applications: {
    status: string;
  }[];
}

export default function DashboardOverview({ applications }: DashboardOverviewProps) {
  const totalApplications = applications.length;
  const underReview = applications.filter(app => app.status === "Under Review").length;
  const interviews = applications.filter(app => app.status === "Interview Scheduled").length;
  const rejected = applications.filter(app => app.status === "Rejected").length;

  const overviewItems = [
    { title: 'Total Applications', value: totalApplications, icon: FileText, color: 'bg-blue-500' },
    { title: 'Under Review', value: underReview, icon: Clock, color: 'bg-yellow-500' },
    { title: 'Interviews Scheduled', value: interviews, icon: CheckCircle, color: 'bg-green-500' },
    { title: 'Rejected', value: rejected, icon: XCircle, color: 'bg-red-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {overviewItems.map((item, index) => (
        <motion.div
          key={item.title}
          className={`${item.color} rounded-lg shadow-md p-6 text-white`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold mb-2">{item.title}</p>
              <h3 className="text-3xl font-bold">{item.value}</h3>
            </div>
            <item.icon className="w-12 h-12 opacity-80" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
