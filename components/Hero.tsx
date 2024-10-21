"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const betterWorldVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

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
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
      <motion.div
        className="container mx-auto px-4 relative z-10 text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          variants={item}
        >
          Innovating to build a{" "}
          <motion.span
            className="text-teal-400 inline-block"
            variants={betterWorldVariants}
            initial="hidden"
            animate="visible"
          >
            better world
          </motion.span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed"
          variants={item}
        >
          BQI Tech&apos;s advances across industries are improving the quality
          of life for consumers worldwide.
        </motion.p>
        <motion.div variants={item} className="flex justify-center space-x-4">
          <Link
            href="#learn-more"
            className="bg-teal-500 text-white px-8 py-3 rounded-full font-semibold transition-all hover:bg-teal-600 hover:shadow-lg flex items-center"
          >
            Learn more <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            href="/contact-us"
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold transition-all hover:bg-white/10"
          >
            Contact Us
          </Link>
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === 0 ? "bg-teal-500" : "bg-white bg-opacity-50"
              }`}
              whileHover={{ scale: 1.2 }}
            ></motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
