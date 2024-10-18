"use client";

import Link from "next/link";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/hero-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Innovating to build a <br />
          <span className="text-teal-400">better world</span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          BQI Tech&apos;s advances across industries such as agriculture, consumer goods, personal
          care, transportation and textiles are helping improve the quality of life for consumers
          around the world.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Link
            href="#learn-more"
            className="bg-teal-500 text-white px-6 py-3 rounded-full font-semibold transition-all hover:bg-teal-600"
          >
            Learn more
          </Link>
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-teal-500' : 'bg-white bg-opacity-50'}`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
