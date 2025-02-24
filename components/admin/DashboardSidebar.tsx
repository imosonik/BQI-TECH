"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FileText,
  CheckCircle,
  Code,
  Users,
  XCircle,
  UserCheck,
  BarChart2,
  LogOut,
  X,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { useClerk } from "@clerk/nextjs";

const tabs = [
  {
    id: "overview",
    icon: BarChart2,
    label: "Overview",
    href: "/admin/overview",
  },
 
  {
    id: "applications",
    icon: FileText,
    label: "Applications",
    href: "/admin/applications",
  },
  {
    id: "shortlisted",
    icon: CheckCircle,
    label: "Shortlisted",
    href: "/admin/shortlisted",
  },
  {
    id: "technical-assessment",
    icon: Code,
    label: "Technical Assessment",
    href: "/admin/technical-assessment",
  },
  {
    id: "interviewing",
    icon: Users,
    label: "Interviewing",
    href: "/admin/interviewing",
  },
  {
    id: "disqualified",
    icon: XCircle,
    label: "Disqualified",
    href: "/admin/disqualified",
  },
  { id: "hired", icon: UserCheck, label: "Hired", href: "/admin/hired" },
  {
    id: "job-postings",
    icon: Briefcase,
    label: "Job Postings",
    href: "/admin/job-postings",
  },
  {
    id: "whats-new",
    icon: Sparkles,
    label: "What's New",
    href: "/admin/whats-new",
  },
];

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DashboardSidebar({
  isOpen,
  onClose,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();

  async function handleLogout() {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      // Implement error handling (e.g., show an error toast)
    }
  }

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center">
          <Image
            src="/bqilogo.png"
            alt="BQI Tech Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <h1 className="text-xl font-bold text-gray-800">BQI Tech HR</h1>
        </div>
        <button onClick={onClose} className="text-gray-500 md:hidden">
          <X size={24} />
        </button>
      </div>
      <nav className="mt-8">
        {tabs.map((tab) => (
          <motion.div
            key={tab.id}
            className={`flex items-center w-full px-4 py-3 text-left cursor-pointer ${
              pathname === tab.href
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={tab.href}
              className="flex items-center w-full"
              onClick={onClose}
            >
              <tab.icon className="w-5 h-5 mr-3" />
              {tab.label}
            </Link>
          </motion.div>
        ))}
      </nav>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <motion.button
          className="flex items-center justify-center w-full bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </motion.button>
      </div>
    </aside>
  );
}
