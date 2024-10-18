'use client'

import { useState, useEffect } from 'react'
import Loader from '@/components/Loader'

export default function CareersPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time (remove this in production and use real loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <main className="container mx-auto px-4 py-8 mt-32">
      <h1 className="text-4xl font-bold mb-6">Careers at BQI Tech</h1>
      <p className="text-lg mb-4">
        Join our team of innovators and make a difference in the world of technology.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Open Positions</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Software Engineer</li>
        <li>Product Manager</li>
        <li>UX/UI Designer</li>
        <li>Data Scientist</li>
      </ul>
      <p className="mt-6">
        To apply, please send your resume and cover letter to{' '}
        <a href="mailto:careers@bqitech.com" className="text-blue-600 hover:underline">
          careers@bqitech.com
        </a>
      </p>
    </main>
  )
}
