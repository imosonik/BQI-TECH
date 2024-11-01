"use client"

import { motion } from "framer-motion"
import { AboutLayout } from "@/components/layouts/AboutLayout"
import { Card } from "@/components/ui/card"
import { Cookie, Shield, Settings, Info } from "lucide-react"

export default function CookiePolicy() {
  const policies = [
    {
      icon: <Cookie className="h-6 w-6" />,
      title: "What Are Cookies",
      description: "Cookies are small text files that are placed on your computer by websites that you visit."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "How We Use Cookies",
      description: "We use cookies to enhance your experience and analyze our traffic to improve our services."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Cookie Settings",
      description: "You can choose to disable cookies through your browser settings at any time."
    },
    {
      icon: <Info className="h-6 w-6" />,
      title: "Types of Cookies",
      description: "We use both session cookies and persistent cookies for various purposes."
    }
  ]

  const breadcrumbItems = [
    { label: "About", href: "/about" },
    { label: "Cookie Policy" }
  ]

  return (
    <AboutLayout
      title="Cookie Policy"
      subtitle="Understanding how we use cookies to improve your experience"
      breadcrumbItems={breadcrumbItems}
    >
      <div className="grid md:grid-cols-2 gap-6">
        {policies.map((policy, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4 text-[#31CDFF]">{policy.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{policy.title}</h3>
              <p className="text-gray-600">{policy.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12 p-6 bg-gray-50 rounded-lg"
      >
        <h2 className="text-2xl font-semibold mb-4">Your Privacy Matters</h2>
        <p className="text-gray-600">
          We respect your privacy and are committed to being transparent about our use of cookies. 
          You can review our Privacy Policy for more information about how we protect your data.
        </p>
      </motion.div>
    </AboutLayout>
  )
} 