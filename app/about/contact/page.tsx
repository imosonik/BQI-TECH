"use client";

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Sparkles } from 'lucide-react';

export default function ContactUsPage() {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const inputVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <motion.main 
      className="container mx-auto px-4 py-12 mt-24 max-w-7xl relative"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/30 -z-10 rounded-3xl blur-3xl" />

      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-teal-500" />
          <span className="text-teal-500 font-semibold tracking-wider text-sm">
            GET IN TOUCH WITH US
          </span>
        </motion.div>
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 text-transparent bg-clip-text">
          Let's Build Something Amazing
        </h1>
        <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
          Have a question or want to work together? We'd love to hear from you.
          Our team is ready to help bring your vision to life.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <motion.div
          className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl shadow-teal-500/5 p-8 border border-gray-100"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          variants={staggerChildren}
        >
          <form className="space-y-8">
            <motion.div variants={inputVariants} className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-white/50"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-white/50"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </motion.div>
            <motion.div variants={inputVariants}>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-white/50"
                placeholder="What's this about?"
                required
              />
            </motion.div>
            <motion.div variants={inputVariants}>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-white/50"
                placeholder="Tell us about your project..."
                required
              ></textarea>
            </motion.div>
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-teal-500/20 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-5 h-5" />
              Send Message
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl shadow-teal-500/5 p-8 space-y-6 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-teal-500 to-blue-500 text-transparent bg-clip-text">
              Contact Information
            </h2>
            <div className="space-y-4">
              <motion.a 
                href="https://maps.google.com/?q=The+Piano,+Brookside+Drive,+Westlands,+Nairobi,+Kenya"
                target="_blank"
                className="flex items-center p-4 bg-white/50 rounded-xl hover:bg-teal-50 transition-colors duration-200 group"
                whileHover={{ x: 5, scale: 1.02 }}
              >
                <MapPin className="mr-3 text-teal-500 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-gray-700">The Piano, 8th Floor, Brookside Drive, Westlands, Nairobi, Kenya</span>
              </motion.a>
              <motion.a 
                href="tel:+254011229528"
                className="flex items-center p-4 bg-white/50 rounded-xl hover:bg-teal-50 transition-colors duration-200 group"
                whileHover={{ x: 5, scale: 1.02 }}
              >
                <Phone className="mr-3 text-teal-500 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-gray-700">+254 (0)11 229 5287</span>
              </motion.a>
              <motion.a 
                href="mailto:info@bqitech.com"
                className="flex items-center p-4 bg-white/50 rounded-xl hover:bg-teal-50 transition-colors duration-200 group"
                whileHover={{ x: 5, scale: 1.02 }}
              >
                <Mail className="mr-3 text-teal-500 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-gray-700">info@bqitech.com</span>
              </motion.a>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl shadow-teal-500/5 overflow-hidden border border-gray-100">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8176744277105!2d36.80943661475403!3d-1.2635390990699898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f17366e8d5d8f%3A0x1b3b7bd8d8a9d4a0!2sThe%20Piano%2C%20Brookside%20Dr%2C%20Nairobi!5e0!3m2!1sen!2sus!4v1637310000000!5m2!1sen!2sus"
              width="100%" 
              height="350" 
              style={{border:0}} 
              allowFullScreen={true} 
              loading="lazy"
              className="w-full hover:opacity-90 transition-opacity duration-200"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
