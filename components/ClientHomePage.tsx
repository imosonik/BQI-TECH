"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import Features from "@/components/Features";
import RecentProjects from "@/components/RecentProjects";
import BlogPreview from "@/components/BlogPreview";
import CallToAction from "@/components/CallToAction";

interface ClientHomePageProps {
  userId: string | null
}
interface ClientHomePageProps {
  userId: string | null;
}
export default function ClientHomePage({ userId }: ClientHomePageProps) {
  const router = useRouter();
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  useEffect(() => {
    if (userId) {
      router.push('/dashboard');
    }
  }, [userId, router]);

  if (userId) return null; // Prevent flash of content before redirect

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Features />
      <RecentProjects />
      <BlogPreview />
      <CallToAction />
    </motion.div>
  );
}