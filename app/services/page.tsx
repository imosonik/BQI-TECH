'use client'

import { motion } from 'framer-motion'
import { Zap, Shield, Briefcase, ArrowRight } from 'lucide-react'

const services = [
  { 
    icon: Zap, 
    title: 'Professional Services', 
    desc: 'Expert consulting and implementation',
    details: 'Our professional services team provides expert guidance and hands-on implementation to help your business leverage cutting-edge technologies effectively. From strategy development to system integration, we ensure smooth adoption and optimal performance of your tech solutions.'
  },
  { 
    icon: Shield, 
    title: 'Business Licensing', 
    desc: 'Streamlined licensing solutions',
    details: 'Navigate the complex world of business licensing with ease. Our streamlined solutions help you obtain and manage all necessary licenses and permits, ensuring your business operates legally and efficiently across various jurisdictions.'
  },
  { 
    icon: Briefcase, 
    title: 'Professional Licensing', 
    desc: 'Efficient credential management',
    details: 'Simplify the process of acquiring and maintaining professional licenses and credentials. Our efficient management system helps individuals and organizations stay compliant with industry regulations, track renewal deadlines, and manage continuing education requirements.'
  },
]

export default function ServicesPage() {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.main 
      className="container mx-auto px-4 py-8 mt-20"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Services
      </motion.h1>
      <motion.p 
        className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        At BQI Tech, we offer a range of innovative solutions to help businesses thrive in the digital age. Explore our services below to see how we can help you achieve your goals.
      </motion.p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div 
            key={service.title}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
          >
            <service.icon className="w-12 h-12 text-teal-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">{service.title}</h2>
            <p className="text-gray-600 mb-4">{service.desc}</p>
            <p className="text-gray-700 mb-4">{service.details}</p>
            <motion.a
              href="#"
              className="inline-flex items-center text-teal-500 hover:text-teal-600"
              whileHover={{ x: 5 }}
            >
              Learn more <ArrowRight className="ml-2 h-4 w-4" />
            </motion.a>
          </motion.div>
        ))}
      </div>
    </motion.main>
  )
}
