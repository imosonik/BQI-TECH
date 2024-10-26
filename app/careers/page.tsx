'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { motion, AnimatePresence } from 'framer-motion'
import { JobPosting } from "@/types/jobPosting"
import { Briefcase, MapPin, Calendar, Search, ChevronRight } from 'lucide-react'
import Loader from '@/components/Loader'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function CareersPage() {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([])
  const [filteredJobs, setFilteredJobs] = useState<JobPosting[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [locationFilter, setLocationFilter] = useState('all')

  useEffect(() => {
    async function fetchJobPostings() {
      try {
        const response = await fetch("/api/job-postings")
        if (!response.ok) {
          throw new Error("Failed to fetch job postings")
        }
        const data = await response.json()
        setJobPostings(data)
        setFilteredJobs(data)
      } catch (err) {
        setError("Failed to load job postings. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobPostings()
  }, [])

  useEffect(() => {
    const filtered = jobPostings.filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (departmentFilter === 'all' || job.department === departmentFilter) &&
      (locationFilter === 'all' || job.location === locationFilter)
    )
    setFilteredJobs(filtered)
  }, [searchTerm, departmentFilter, locationFilter, jobPostings])

  if (isLoading) return <Loader />
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>

  const departments = Array.from(new Set(jobPostings.map(job => job.department)))
  const locations = Array.from(new Set(jobPostings.map(job => job.location)))

  return (
    <div className="container mx-auto px-4 py-40">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Careers</span>
              </div>
            </li>
          </ol>
        </nav>
        <h1 className="text-4xl font-bold mb-2 text-blue-600">Careers at BQI Tech</h1>
        <p className="text-xl text-gray-600 mb-8">Join our team and help shape the future of technology!</p>
      </motion.div>
      
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row gap-4 items-start justify-start mb-4">
          <div className="relative w-full md:w-1/3">
            <Input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full md:w-1/4">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map(dept => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-full md:w-1/4">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map(loc => (
                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </motion.div>
      
      <AnimatePresence>
        <motion.div 
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {filteredJobs.map((job, index) => (
            <motion.div 
              key={job.id} 
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2 text-blue-600">{job.title}</h2>
                <div className="flex items-center text-gray-600 mb-4">
                  <Briefcase className="w-4 h-4 mr-2 text-blue-500" />
                  <span>{job.department}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                  <span>{new Date(job.postedDate).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700 mb-6">{job.description.substring(0, 150)}...</p>
                <Link href={`/careers/apply/${job.id}`}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Apply Now</Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      
      {filteredJobs.length === 0 && (
        <motion.p
          className="text-center text-gray-600 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No job postings found. Please try different search criteria.
        </motion.p>
      )}
    </div>
  )
}
