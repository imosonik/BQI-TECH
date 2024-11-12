"use client";

import { motion } from 'framer-motion';
import { FileText, CheckCircle, Code, MessageSquare, UserCheck, XCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

interface ApplicationStats {
  totalApplications: number;
  shortlisted: number;
  technicalAssessment: number;
  interviewing: number;
  hired: number;
  disqualified: number;
}

export default function DashboardOverview() {
  const { data: stats, isLoading } = useQuery<ApplicationStats>({
    queryKey: ['applicationStats'],
    queryFn: () => api.get('/user/application-stats').then(res => res.data)
  });

  if (isLoading) {
    return <DashboardOverviewSkeleton />;
  }

  const overviewItems = [
    { 
      title: 'Total Applications', 
      value: stats?.totalApplications || 0, 
      icon: FileText, 
      color: 'bg-[#4B72EE]' 
    },
    { 
      title: 'Shortlisted', 
      value: stats?.shortlisted || 0, 
      icon: CheckCircle, 
      color: 'bg-[#22C55E]' 
    },
    { 
      title: 'Technical Assessment', 
      value: stats?.technicalAssessment || 0, 
      icon: Code, 
      color: 'bg-[#EAB308]' 
    },
    { 
      title: 'Interviewing', 
      value: stats?.interviewing || 0, 
      icon: MessageSquare, 
      color: 'bg-[#A855F7]' 
    },
    { 
      title: 'Hired', 
      value: stats?.hired || 0, 
      icon: UserCheck, 
      color: 'bg-[#6366F1]' 
    },
    { 
      title: 'Disqualified', 
      value: stats?.disqualified || 0, 
      icon: XCircle, 
      color: 'bg-[#EF4444]' 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {overviewItems.map((item, index) => (
        <motion.div
          key={item.title}
          className={`${item.color} rounded-xl shadow-md p-6 text-white hover:shadow-lg transition-shadow`}
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

function DashboardOverviewSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-xl shadow-md p-6 bg-gray-100">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" /> {/* Title */}
              <Skeleton className="h-8 w-16" /> {/* Value */}
            </div>
            <Skeleton className="h-12 w-12 rounded-full" /> {/* Icon */}
          </div>
        </div>
      ))}
    </div>
  );
}
