"use client";

import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Features from "../components/Features";
import RecentProjects from "../components/RecentProjects";
import Testimonials from "../components/Testimonials";
import BlogPreview from "../components/BlogPreview";
import CallToAction from "../components/CallToAction";

export default function HomePage() {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

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
      <Testimonials />
      <BlogPreview />
      <CallToAction />
    </motion.div>
  );
}
