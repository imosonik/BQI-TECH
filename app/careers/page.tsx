'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Loader from '@/components/Loader'

const openPositions = [
  { title: 'Software Engineer', department: 'Engineering' },
  { title: 'Product Manager', department: 'Product' },
  { title: 'UX/UI Designer', department: 'Design' },
  { title: 'Data Scientist', department: 'Data Science' },
];

export default function CareersPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time (remove this in production and use real loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  if (isLoading) {
    return <Loader />
  }

  return (
    <motion.main 
      className="container mx-auto px-4 py-8 mt-32"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Careers at BQI Tech
      </motion.h1>
      <motion.p 
        className="text-lg mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Join our team of innovators and make a difference in the world of technology.
      </motion.p>
      <motion.h2 
        className="text-2xl font-semibold mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Open Positions
      </motion.h2>
      <motion.div 
        className="grid md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {openPositions.map((position, index) => (
          <motion.div 
            key={position.title}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
            <p className="text-gray-600 mb-4">{position.department}</p>
            <a href="#" className="text-teal-500 hover:text-teal-600">View Details</a>
          </motion.div>
        ))}
      </motion.div>
      <motion.p 
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        To apply, please send your resume and cover letter to{' '}
        <a href="mailto:careers@bqitech.com" className="text-teal-500 hover:underline">
          careers@bqitech.com
        </a>
      </motion.p>
    </motion.main>
  )
}
