"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Shield, Lightbulb, Code, Users, Target, Award } from 'lucide-react'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { useRouter } from 'next/navigation'

const expertise = [
  { 
    icon: Code, 
    title: 'Custom Software Development', 
    description: 'We design and develop high-performance, scalable software solutions tailored to meet the unique needs of government agencies and enterprises.',
    features: [
      'Web & Mobile Application Development - Secure, responsive, and user-friendly digital solutions.',
      'Legacy System Modernization - Transform outdated systems into modern, cloud-based platforms.',
      'Cloud-Native Solutions - Scalable, secure cloud applications to improve operational efficiency.',
      'API Development & Integration - Seamless data connectivity between systems.'
    ]
  },
  { 
    icon: Lightbulb, 
    title: 'Enterprise Platform & IT Consulting', 
    description: 'We provide comprehensive IT consulting and enterprise platform optimization services to help organizations implement and manage large-scale systems.',
    features: [
      'Enterprise Platform Setup - Full-scale implementation and configuration for government IT solutions.',
      'System Optimization & Performance Tuning - Enhancing speed, security, and efficiency.',
      'Workflow Automation - Streamlining processes with AI-powered automation.',
      'Custom Configuration Services - Tailored adjustments to maximize your system\'s capabilities.'
    ]
  },
]

const leadership = [
  {
    title: "Our Community",
    description: "We actively participate in technology conferences and government innovation forums to stay at the forefront of public sector solutions.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070",
    link: "Join our Community"
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

  const router = useRouter()

  return (
    <motion.main 
      className="container mx-auto px-4 py-16 -mt-16"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section - Enhanced Styling */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative mb-24 py-40 overflow-hidden rounded-[2.5rem] shadow-2xl"
      >
        {/* Background Image with Enhanced Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600"
            alt="Technology Background"
            fill
            className="object-cover scale-110 transform hover:scale-105 transition-transform duration-[2s]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1347]/95 via-[#272055]/90 to-[#31CDFF]/80" />
        </div>

        {/* Content with Enhanced Typography */}
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="backdrop-blur-sm py-8 rounded-3xl"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8 text-white tracking-tight">
              Innovating for{" "}
              <span className="bg-gradient-to-r from-[#31CDFF] via-blue-400 to-purple-400 text-transparent bg-clip-text">
                Tomorrow
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed font-light">
              BQI Tech pioneers digital transformation in government services, 
              bringing cutting-edge solutions and expertise to public sector innovation.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Expertise Section with Enhanced Card Styling */}
      <motion.section className="mb-32">
        <h2 className="text-4xl font-bold mb-16 text-center text-gray-800 tracking-tight">
          Our Core{" "}
          <span className="bg-gradient-to-r from-[#272055] to-[#31CDFF] text-transparent bg-clip-text">
            Expertise
          </span>
        </h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {expertise.map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-white p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] 
                       hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.15)] transition-all duration-500
                       border border-gray-100 hover:border-[#31CDFF]/40 group backdrop-blur-sm"
              whileHover={{ 
                scale: 1.02,
                y: -5,
                rotate: 0.5
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-gradient-to-br from-[#31CDFF]/10 via-purple-500/10 to-blue-500/10 p-8 rounded-2xl mb-8
                              group-hover:from-[#31CDFF]/20 group-hover:via-purple-500/20 group-hover:to-blue-500/20 
                              transition-all duration-500 shadow-lg"
                >
                  <item.icon className="w-16 h-16 text-[#31CDFF] group-hover:scale-110 transition-all duration-500
                                    group-hover:rotate-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 tracking-tight">{item.title}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">{item.description}</p>
                
                {/* Enhanced Features List */}
                <div className="w-full space-y-2 mt-4">
                  {item.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="flex items-center gap-3 text-left bg-gradient-to-r from-gray-50 to-white p-3 rounded-xl
                                hover:from-[#31CDFF]/5 hover:to-purple-500/5 transition-colors duration-300
                                shadow-sm hover:shadow group/feature"
                    >
                      <div className="h-2 w-2 rounded-full bg-[#31CDFF] group-hover/feature:scale-150 transition-transform duration-300" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Leadership & Community Sections with Enhanced Styling */}
      {leadership.map((section, index) => (
        <motion.section
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 * index }}
          className="mb-32"
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className={`space-y-8 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
              <h2 className="text-4xl font-bold text-gray-800 tracking-tight">{section.title}</h2>
              <p className="text-xl text-gray-600 leading-relaxed">{section.description}</p>
              <motion.button
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-teal-500 to-[#31CDFF] text-white px-8 py-4 rounded-full 
                         font-semibold hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300
                         transform hover:-translate-y-1"
                onClick={() => router.push('https://www.linkedin.com/company/bqi-technologies')}
              >
                {section.link}
              </motion.button>
            </div>
            <div className={`relative h-[500px] ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover rounded-[2rem] shadow-2xl transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </motion.section>
      ))}

      {/* Enhanced Commitment Section with Better Styling */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="bg-gradient-to-r from-[#272055] via-[#31CDFF] to-[#272055] text-white py-24 px-8 rounded-[2rem]
                   shadow-2xl relative overflow-hidden"
      >
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold mb-8 tracking-tight">Our Commitment</h2>
          <p className="text-xl mb-10 leading-relaxed font-light">
            At BQI Tech, we're dedicated to pushing the boundaries of what's possible in government technology. 
            Our mission is to create innovative, secure, and user-centric solutions that make a real difference.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-[#272055] px-10 py-5 rounded-full font-bold hover:bg-gray-50 
                     transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1
                     hover:shadow-white/20"
            onClick={() => router.push('/services')}
          >
            Explore Our Services
          </motion.button>
        </div>
      </motion.section>
    </motion.main>
  )
}
