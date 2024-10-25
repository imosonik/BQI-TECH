'use client'

import { useState, useEffect } from 'react'
import Link from "next/link";
import { motion } from 'framer-motion';
import { JobPosting } from "@/types/jobPosting";
import { Briefcase, MapPin, Calendar, Loader2 } from 'lucide-react';

export default function CareersPage() {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJobPostings() {
      try {
        const response = await fetch("/api/job-postings");
        if (!response.ok) {
          throw new Error("Failed to fetch job postings");
        }
        const data = await response.json();
        setJobPostings(data);
      } catch (err) {
        setError("Failed to load job postings. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchJobPostings();
  }, []);

  if (isLoading) return <Loader2 className="animate-spin" />;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-36">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Careers at BQI Tech
      </motion.h1>
      <motion.p 
        className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Join our team and help shape the future of technology!
      </motion.p>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {jobPostings.map((job, index) => (
          <motion.div 
            key={job.id} 
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
              <div className="flex items-center text-gray-600 mb-4">
                <Briefcase className="w-4 h-4 mr-2" />
                <span>{job.department}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{new Date(job.postedDate).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-700 mb-6">{job.description.substring(0, 150)}...</p>
              <Link 
                href={`/careers/apply/${job.id}`}
                className="inline-block bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
              >
                Apply Now
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
