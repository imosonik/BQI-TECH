"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-20 bg-teal-600">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Government Tech?
          </h2>
          <p className="text-xl text-white mb-8">
            Let's work together to create innovative solutions for your agency.
          </p>
          <Link
            href="/contact-us"
            className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
