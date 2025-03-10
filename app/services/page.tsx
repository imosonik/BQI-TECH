'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Briefcase, Code } from 'lucide-react'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import { Suspense } from 'react'
import Link from 'next/link'

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 ">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={1} />
          
          {Array.from({ length: 50 }).map((_, i) => (
            <Sphere
              key={i}
              position={[
                Math.random() * 20 - 10,
                Math.random() * 20 - 10,
                Math.random() * 20 - 10
              ]}
              scale={Math.random() * 0.2}
            >
              <meshStandardMaterial
                color={`hsl(${Math.random() * 90 + 180}, 50%, 50%)`}
                transparent
                opacity={0.6}
              />
            </Sphere>
          ))}

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

const services = [
  {
    icon: Briefcase,
    title: 'Professional and Implementation Services',
    description: `BQI Tech provides the technical expertise and hands-on experience essential for tackling today's complex IT projects. With in-depth knowledge of enterprise platforms and the latest emerging technologies, we deliver solutions with precision and efficiency.`,
    details: [
      'Configuration - Our team are experts in configuration and can support you to set up and customize your enterprise platform.',
      'Report writing - Writing and customizing reports can be rough. Let BQI Tech use our knowledge of writing SSRS, Crystal, and other types of reports make your life easier.'
    ],
    image: '/implementation.jpg'
  },
  {
    icon: Code,
    title: 'Software Engineering Services',
    description: `Our software engineering team, along with experience design and DevOps experts, supports the full lifecycle of web and mobile application development—from project initiation and development through testing, deployment, maintenance, and support.`,
    details: [
      'Our engineering expertise enables clients to create, enhance, and manage core systems, including commercial off-the-shelf (COTS) software, equipping their teams with a future-ready digital foundation.',
      'Through platform engineering, we address challenges, achieve economies of scale, and foster synergies across products and business lines.'
    ],
    image: '/software.jpg'
  }
]

export default function ServicesPage() {
  const breadcrumbItems = [
    { label: "Services" }
  ]

  return (
    <>
      <AnimatedBackground />
      <motion.main 
        className="container mx-auto px-4 py-16 -mt-16 relative"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={{
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 }
        }}
        transition={{ duration: 0.5 }}
      >
        <Breadcrumb items={breadcrumbItems} />

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-16 py-24 overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#272055]/70 to-[#31CDFF]/60" />
          </div>

          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
              Our Services
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Comprehensive solutions to help your business succeed
            </p>
          </div>
        </motion.section>

        {services.map((service, index) => (
          <motion.section
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 * index }}
            className="mb-24 p-8 rounded-2xl bg-white/90 backdrop-blur-sm"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={`space-y-6 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                <h2 className="text-3xl font-bold text-gray-800">{service.title}</h2>
                <p className="text-lg text-gray-600">{service.description}</p>
                <ul className="list-disc pl-5 text-gray-600">
                  {service.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </div>
              <div className={`relative h-[400px] ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover rounded-lg shadow-xl"
                />
              </div>
            </div>
          </motion.section>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <h2 className="text-2xl font-semibold mb-4">Interested in Our Services?</h2>
          <p className="text-gray-600 mb-6">
            Contact us to learn more about how we can help your business.
          </p>
          <Link href="/contact-us">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#31CDFF' }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#272055] hover:bg-[#31CDFF] text-white rounded-full px-8 py-4 inline-block shadow-lg transition-all duration-300"
            >
              Contact Us
            </motion.button>
          </Link>
        </motion.div>
      </motion.main>
    </>
  )
}

export const metadata = {
  title: 'Our Services | BQI Tech',
  description: 'Explore BQI Tech\'s comprehensive range of technology services including software development, consulting, and digital transformation solutions.',
  keywords: ['tech services', 'software development', 'IT consulting', 'digital transformation'],
  alternates: {
    canonical: 'https://bqitech.com/services'
  }
}
