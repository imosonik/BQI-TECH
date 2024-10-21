"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Code, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure Solutions",
    description: "Our products are built with security at their core, ensuring your data is always protected.",
  },
  {
    icon: Zap,
    title: "High Performance",
    description: "Optimized for speed and efficiency, our solutions help you work faster and smarter.",
  },
  {
    icon: Code,
    title: "Custom Development",
    description: "We create tailor-made solutions that perfectly fit your unique business needs.",
  },
  {
    icon: Users,
    title: "Collaborative Approach",
    description: "We work closely with you to ensure our solutions align with your goals and vision.",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Why Choose BQI Tech
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <feature.icon className="w-12 h-12 text-teal-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
