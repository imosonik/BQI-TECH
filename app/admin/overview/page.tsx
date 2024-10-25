"use client";

import { motion } from 'framer-motion';
import { Users, FileText, CheckCircle, XCircle, UserCheck, Code, MessageSquare } from 'lucide-react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function OverviewPage() {
  const { data: overviewData, error, isLoading } = useSWR('/api/admin/overview', fetcher);

  if (error) return <div>Failed to load overview data</div>;
  if (isLoading) return <div>Loading...</div>;

  const overviewItems = [
    { title: 'Total Applications', value: overviewData.totalApplications, icon: FileText, color: 'bg-blue-500' },
    { title: 'Shortlisted', value: overviewData.shortlisted, icon: CheckCircle, color: 'bg-green-500' },
    { title: 'Technical Assessment', value: overviewData.technicalAssessment, icon: Code, color: 'bg-yellow-500' },
    { title: 'Interviewing', value: overviewData.interviewing, icon: MessageSquare, color: 'bg-purple-500' },
    { title: 'Hired', value: overviewData.hired, icon: UserCheck, color: 'bg-indigo-500' },
    { title: 'Disqualified', value: overviewData.disqualified, icon: XCircle, color: 'bg-red-500' },
  ];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">Admin Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
}
