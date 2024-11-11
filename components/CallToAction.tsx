"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function CallToAction() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#272055] to-[#1D1640]">
      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ backgroundPosition: "0% 0%" }}
        animate={{ backgroundPosition: "100% 100%" }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        style={{
          backgroundImage: "url('/grid-pattern.svg')",
          backgroundSize: "cover"
        }}
      />
      
      <div className="container relative mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            className="flex items-center justify-center gap-2 mb-6"
            variants={itemVariants}
          >
            <Sparkles className="w-5 h-5 text-[#31CDFF]" />
            <span className="text-[#31CDFF] font-medium">Innovation Starts Here</span>
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
            variants={itemVariants}
          >
            Ready to Transform Your
            <span className="text-[#31CDFF]"> Government Tech</span>?
          </motion.h2>

          <motion.p 
            className="text-xl text-gray-300 mb-10"
            variants={itemVariants}
          >
            Let's work together to create innovative solutions for your agency.
            Join the digital transformation journey today.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/contact-us"
              className="group flex items-center gap-2 bg-[#31CDFF] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#272055] transition-all duration-300 hover:shadow-lg hover:shadow-[#31CDFF]/20"
            >
              Get Started
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/services"
              className="text-white hover:text-[#31CDFF] font-medium transition-colors duration-300"
            >
              Learn More About Our Services
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
