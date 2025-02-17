"use client";

import { motion } from 'framer-motion';
import { Users, FileText, CheckCircle, XCircle, UserCheck, Code, MessageSquare, ArrowRight, Calendar, ChevronRight, Bell } from 'lucide-react';
import useSWR from 'swr';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { UserButton } from "@clerk/nextjs"
import { NotificationButton } from "@/components/NotificationButton"
import { useUser } from "@clerk/nextjs"

// Separate fetchers for different endpoints
const overviewFetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const applicationsFetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return Array.isArray(data) ? data : data.applications || [];
};

interface Application {
  id: string
  name: string
  position: string
  status: string
  appliedDate: string
}

export default function OverviewPage() {
  const router = useRouter();
  const { user } = useUser()
  
  const { data: overviewData, error: overviewError, isLoading: isOverviewLoading } = 
    useSWR('/api/admin/overview', overviewFetcher);
  
  const { data: recentApplications = [], error: applicationsError, isLoading: isApplicationsLoading } = 
    useSWR('/api/admin/applications/recent', applicationsFetcher);

  if (overviewError || applicationsError) return <div>Failed to load data</div>;
  if (isOverviewLoading || isApplicationsLoading) return <div>Loading...</div>;
  if (!overviewData || !recentApplications) return <div>No data available</div>;

  
  const overviewItems = [
    { 
      title: 'Total Applications', 
      value: overviewData?.totalApplications || 0, 
      icon: FileText, 
      color: 'from-blue-400 to-blue-600' 
    },
    { 
      title: 'Shortlisted', 
      value: overviewData?.shortlisted || 0, 
      icon: CheckCircle, 
      color: 'from-green-400 to-green-600' 
    },
    { 
      title: 'Technical Assessment', 
      value: overviewData?.technicalAssessment || 0, 
      icon: Code, 
      color: 'from-yellow-400 to-yellow-600' 
    },
    { 
      title: 'Interviewing', 
      value: overviewData?.interviewing || 0, 
      icon: MessageSquare, 
      color: 'from-purple-400 to-purple-600' 
    },
    { 
      title: 'Hired', 
      value: overviewData?.hired || 0, 
      icon: UserCheck, 
      color: 'from-indigo-400 to-indigo-600' 
    },
    { 
      title: 'Disqualified', 
      value: overviewData?.disqualified || 0, 
      icon: XCircle, 
      color: 'from-red-400 to-red-600' 
    },
  ];

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Header Section - Mobile Responsive */}
      <div className="flex flex-col gap-4 mb-6 md:mb-8">
        {/* Top Bar with Profile - Always Visible */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Overview</h1>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <NotificationButton variant="ghost" />
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">
                {user?.firstName || ''}
              </span>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8",
                    footer: "hidden",
                    userPreviewMainIdentifier: "hidden",
                    userButtonPopoverFooter: "hidden",
                    userButtonPopoverCard: "!mb-0",
                    developmentModeText: "hidden",
                    userButtonPopoverSecurityBox: "hidden"
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Breadcrumb - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
          <span>Admin</span>
          <ChevronRight className="h-4 w-4" />
          <span>Overview</span>
        </div>

        {/* Desktop Header Actions - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-4 absolute top-8 right-8">
          <NotificationButton />
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">
              {user?.firstName || ''}
            </span>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                  footer: "hidden",
                  userPreviewMainIdentifier: "hidden",
                  userButtonPopoverFooter: "hidden",
                  userButtonPopoverCard: "!mb-0",
                  developmentModeText: "hidden",
                  userButtonPopoverSecurityBox: "hidden"
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid - Already Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {overviewItems.map((item, index) => (
          <motion.div
            key={item.title}
            className={`relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br ${item.color}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16">
              <div className="absolute inset-0 rounded-full bg-white opacity-10" />
            </div>
            <div className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-4">
                  <div className="p-3 bg-white/10 rounded-lg w-fit">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-lg font-medium text-white/80">{item.title}</p>
                  <h3 className="text-4xl font-bold text-white">{item.value}</h3>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Applications - Mobile Responsive */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white rounded-2xl shadow-lg p-4 md:p-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Recent Applications</h2>
          <Button
            onClick={() => router.push('/admin/applications')}
            variant="outline"
            className="w-full sm:w-auto flex items-center justify-center gap-2 group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {recentApplications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No recent applications
          </div>
        ) : (
          <div className="space-y-4">
            {recentApplications.slice(0, 5).map((app: Application) => (
              <motion.div
                key={app.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100 gap-4"
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className={`p-2 rounded-lg ${getStatusColor(app.status)}`}>
                    {getStatusIcon(app.status)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{app.name}</h3>
                    <p className="text-sm text-gray-500">{app.position}</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {new Date(app.appliedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(`/admin/applications/${app.id}`)}
                    className="w-full sm:w-auto hover:bg-gray-100"
                  >
                    View Details
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

// Helper functions for status colors and icons
function getStatusColor(status: string) {
  switch (status) {
    case "New": return "bg-blue-100 text-blue-600";
    case "Shortlisted": return "bg-green-100 text-green-600";
    case "Technical": return "bg-yellow-100 text-yellow-600";
    case "Interview": return "bg-purple-100 text-purple-600";
    case "Hired": return "bg-indigo-100 text-indigo-600";
    case "Rejected": return "bg-red-100 text-red-600";
    default: return "bg-gray-100 text-gray-600";
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "New": return <FileText className="w-5 h-5" />;
    case "Shortlisted": return <CheckCircle className="w-5 h-5" />;
    case "Technical": return <Code className="w-5 h-5" />;
    case "Interview": return <MessageSquare className="w-5 h-5" />;
    case "Hired": return <UserCheck className="w-5 h-5" />;
    case "Rejected": return <XCircle className="w-5 h-5" />;
    default: return <FileText className="w-5 h-5" />;
  }
}
