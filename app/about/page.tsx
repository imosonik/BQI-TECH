'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import {  Shield, Lightbulb, Code } from 'lucide-react'

const teamMembers = [
  { name: 'Ezra Yego', role: 'Chief Executive Officer', image: '/team-member-1.jpg' },
  { name: 'Lynn Sugut', role: 'Chief Technology Officer', image: '/team-member-2.jpg' },
  { name: 'Geoffrey Aldwin Audia', role: 'Junior Configuration Analyst', image: '/team-member-3.jpg' },
  { name: 'Lovell ', role: 'Junior Configuration Analyst', image: '/team-member-4.jpg' },
  { name: 'Ian Mosonik', role: 'Junior Configuration Analyst', image: '/team-member-5.jpg' },
  { name: 'Victor', role: 'Junior Configuration Analyst', image: '/team-member-6.jpg' },
]

const expertise = [
  { icon: Code, title: 'Software Development', description: 'Custom solutions tailored to government needs' },
  { icon: Shield, title: 'Secure Integration', description: 'Ensuring data protection and compliance' },
  { icon: Lightbulb, title: 'Innovative Solutions', description: 'Cutting-edge technology for modern challenges' },
]

export default function AboutPage() {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.main 
      className="container mx-auto px-4 py-16 mt-20"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-6 text-gray-800">About BQI Tech</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          BQI Tech is a Software Development and Technology Professional Services firm dedicated to helping government agencies adopt and integrate innovative technology solutions.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
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

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={member.image}
                alt={member.name}
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
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
