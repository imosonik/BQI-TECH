'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Shield, Lightbulb, Code, Users, Target, Award } from 'lucide-react'
import { Breadcrumb } from '@/components/ui/breadcrumb'

const expertise = [
  { icon: Code, title: 'Software Development', description: 'Custom solutions tailored to government needs' },
  { icon: Shield, title: 'Secure Integration', description: 'Ensuring data protection and compliance' },
  { icon: Lightbulb, title: 'Innovative Solutions', description: 'Cutting-edge technology for modern challenges' },
]

const leadership = [
  {
    title: "Our Leadership",
    description: "Our leadership team brings decades of combined experience in government technology solutions and digital transformation.",
    image: "/leadership.jpg",
    link: "Meet the team"
  },
  {
    title: "Our Community",
    description: "We actively participate in technology conferences and government innovation forums to stay at the forefront of public sector solutions.",
    image: "/community.jpg",
    link: "Join our events"
  }
]

export default function AboutPage() {
  const breadcrumbItems = [
    { label: "About" }
  ]

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  return (
    <motion.main 
      className="container mx-auto px-4 py-16 mt-20"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative mb-16 py-24 overflow-hidden rounded-2xl"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about-hero-bg.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#272055]/90 to-[#31CDFF]/80" />
        </div>

        {/* Animated Grid Pattern Overlay - similar to Hero component */}
        <motion.div
          className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-20"
          initial={{ backgroundPosition: "0% 0%" }}
          animate={{ backgroundPosition: "100% 100%" }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
            About{" "}
            <span className="bg-gradient-to-r from-[#31CDFF] to-purple-600 text-transparent bg-clip-text">
              BQI Tech
            </span>
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            BQI Tech is a Software Development and Technology Professional Services firm dedicated to helping government agencies adopt and integrate innovative technology solutions.
          </p>
        </div>
      </motion.section>

      {/* Expertise Section */}
      <motion.section className="mb-24">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Our Expertise</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {expertise.map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <item.icon className="w-12 h-12 text-teal-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Leadership & Community Sections */}
      {leadership.map((section, index) => (
        <motion.section
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 * index }}
          className="mb-24"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
              <h2 className="text-3xl font-bold text-gray-800">{section.title}</h2>
              <p className="text-lg text-gray-600">{section.description}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-teal-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-600 transition-colors duration-300"
              >
                {section.link}
              </motion.button>
            </div>
            <div className={`relative h-[400px] ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </motion.section>
      ))}

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mb-24 py-16 bg-gray-50 rounded-2xl"
      >
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
          <div className="text-center">
            <Users className="w-12 h-12 text-teal-500 mb-4 mx-auto" />
            <h3 className="text-4xl font-bold text-gray-800 mb-2">100+</h3>
            <p className="text-gray-600">Government Clients</p>
          </div>
          <div className="text-center">
            <Target className="w-12 h-12 text-teal-500 mb-4 mx-auto" />
            <h3 className="text-4xl font-bold text-gray-800 mb-2">95%</h3>
            <p className="text-gray-600">Project Success Rate</p>
          </div>
          <div className="text-center">
            <Award className="w-12 h-12 text-teal-500 mb-4 mx-auto" />
            <h3 className="text-4xl font-bold text-gray-800 mb-2">15+</h3>
            <p className="text-gray-600">Years Experience</p>
          </div>
        </div>
      </motion.section>

      {/* Commitment Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="bg-gradient-to-r from-teal-500 to-blue-600 text-white py-16 px-4 rounded-lg"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Our Commitment</h2>
          <p className="text-lg mb-6">
            At BQI Tech, we are committed to delivering practical, secure, and sustainable solutions that empower government agencies to serve their communities better.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-teal-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Learn More About Our Services
          </motion.button>
        </div>
      </motion.section>
    </motion.main>
  )
}
