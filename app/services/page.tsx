'use client'

import { motion } from 'framer-motion'
import { Zap, Shield, Briefcase } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "@/components/Breadcrumb"

export default function ServicesPage() {
  const breadcrumbItems = [
    { label: "Services" }
  ]

  const services = [
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Business Licensing",
      description: "Streamlined licensing solutions",
      href: "/services/business-licensing"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Professional Services",
      description: "Expert consulting and implementation",
      href: "/services/professional-services"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Other Services",
      description: "Additional business support services",
      href: "/services/other-services"
    }
  ]

  return (
    <div className="min-h-screen pt-32 pb-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-4xl md:text-5xl font-bold text-[#272055] mb-4">Our Services</h1>
        <p className="text-xl text-gray-600 mb-12">
          Comprehensive solutions to help your business succeed
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4 text-[#31CDFF]">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Button 
                  className="bg-[#272055] hover:bg-[#31CDFF] text-white w-full"
                  onClick={() => window.location.href = service.href}
                >
                  Learn More
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
