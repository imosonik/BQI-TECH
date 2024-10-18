"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

function Footer() {
  const socialIcons = [
    { Icon: Facebook, href: "#", label: "Facebook" },
    { Icon: Twitter, href: "#", label: "Twitter" },
    { Icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" }, // Updated to link to the new services page
    { name: "Careers", href: "/careers" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Image
              src="/bqilogo.png"
              alt="BQI Tech Logo"
              width={120}
              height={40}
            />
            <p className="text-gray-300 text-sm">
              Innovating to build a better world through advanced technology
              solutions.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <motion.li key={item.name} whileHover={{ x: 5 }}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-teal-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-teal-400" />
                The Piano, 8th Floor, Brookside Drive, Westlands, Nairobi, Kenya
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-teal-400" />
                +254 (0)11 229 5287
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-teal-400" />
                <a href="mailto:info@bqitech.com" className="hover:text-teal-400 transition-colors">
                  info@bqitech.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              {socialIcons.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="bg-gray-700 p-2 rounded-full hover:bg-teal-500 transition-colors"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">
                Subscribe to our newsletter
              </h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="submit"
                  className="bg-teal-500 text-white px-4 py-2 rounded-r-md hover:bg-teal-600 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        <motion.div
          className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p>
            &copy; {new Date().getFullYear()} BQI Tech. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
