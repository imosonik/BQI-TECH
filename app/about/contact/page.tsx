"use client"

import { motion } from "framer-motion"
import { AboutLayout } from "@/components/layouts/AboutLayout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Contact() {
  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      details: "The Piano, 8th Floor, Brookside Drive, Westlands, Nairobi, Kenya"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      details: "+254 (0)11 229 5287"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      details: "info@bqitech.com"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Working Hours",
      details: "Monday - Friday: 9:00 AM - 6:00 PM"
    }
  ]

  const breadcrumbItems = [
    { label: "About", href: "/about" },
    { label: "Contact" }
  ]

  return (
    <AboutLayout
      title="Contact Us"
      subtitle="Get in touch with our team for any inquiries or support"
      breadcrumbItems={breadcrumbItems}
    >
      <div className="grid lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
            </div>
            <Input type="email" placeholder="Email Address" />
            <Input placeholder="Subject" />
            <Textarea placeholder="Your Message" className="h-32" />
            <Button className="bg-[#272055] hover:bg-[#31CDFF] text-white w-full">
              Send Message
            </Button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          {contactInfo.map((info, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start space-x-4">
                <div className="text-[#31CDFF]">{info.icon}</div>
                <div>
                  <h3 className="font-semibold mb-1">{info.title}</h3>
                  <p className="text-gray-600">{info.details}</p>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>
      </div>
    </AboutLayout>
  )
} 