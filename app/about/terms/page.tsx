"use client"

import { motion } from "framer-motion"
import { AboutLayout } from "@/components/layouts/AboutLayout"

export default function Terms() {
  const sections = [
    {
      title: "1. Terms of Use",
      content: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement."
    },
    {
      title: "2. Use License",
      content: "Permission is granted to temporarily download one copy of the materials (information or software) on BQI Tech's website for personal, non-commercial transitory viewing only."
    },
    {
      title: "3. Disclaimer",
      content: "The materials on BQI Tech's website are provided on an 'as is' basis. BQI Tech makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
    }
  ]

  const breadcrumbItems = [
    { label: "About", href: "/about" },
    { label: "Terms & Conditions" }
  ]

  return (
    <AboutLayout
      title="Terms & Conditions"
      subtitle="Please read these terms carefully before using our services"
      breadcrumbItems={breadcrumbItems}
    >
      <div className="space-y-8">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-semibold mb-4 text-[#272055]">{section.title}</h2>
            <p className="text-gray-600 leading-relaxed">{section.content}</p>
          </motion.div>
        ))}
      </div>
    </AboutLayout>
  )
} 