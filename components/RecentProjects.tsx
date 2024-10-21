"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "Government Agency Portal",
    description: "A secure and efficient portal for managing government services and citizen interactions.",
    image: "/gov.png",
  },
  {
    title: "Smart City Infrastructure",
    description: "IoT-based solution for monitoring and optimizing city resources and services.",
    image: "/smartcity.png",
  },
  {
    title: "Healthcare Data Management",
    description: "Centralized system for managing patient data and streamlining healthcare operations.",
    image: "/health.png",
  },
];

export default function RecentProjects() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Recent Projects
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
