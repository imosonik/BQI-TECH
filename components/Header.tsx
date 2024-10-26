"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Globe, Menu, X } from "lucide-react";
import { SignInButton, useAuth } from "@clerk/nextjs";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Careers", href: "/careers" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const textColor = isScrolled ? "text-black" : "text-white";
  const hoverColor = isScrolled ? "hover:text-blue-600" : "hover:text-blue-300";

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white bg-opacity-90 shadow-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4 py-7 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/bqilogo.png"
            alt="BQI Tech Logo"
            width={120}
            height={40}
          />
        </Link>
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${textColor} ${hoverColor} text-lg font-medium transition-colors`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 text-base"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
          <div className={`flex items-center ${textColor} ${hoverColor} cursor-pointer text-base`}>
            <Globe size={20} className="mr-1" />
            <span>EN</span>
          </div>
          <AuthButton isScrolled={isScrolled} />
          <button
            className={`md:hidden ${isScrolled ? "bg-blue-600 text-white" : "bg-white text-blue-600"} p-2 rounded-md hover:bg-opacity-90 transition-colors`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <motion.div
          className={`md:hidden ${isScrolled ? "bg-white" : "bg-black bg-opacity-80"} shadow-md`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="container mx-auto px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block py-2 ${textColor} ${hoverColor} text-lg`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}

function AuthButton({ isScrolled }: { isScrolled: boolean }) {
  const { isSignedIn } = useAuth();
  const buttonClass = isScrolled
    ? "bg-blue-600 text-white hover:bg-blue-700"
    : "bg-white text-blue-600 hover:bg-blue-100";

  if (isSignedIn) {
    return (
      <Link
        href="/dashboard"
        className={`${buttonClass} px-4 py-2 rounded-md transition-colors text-base font-medium`}
      >
        Dashboard
      </Link>
    );
  }

  return (
    <SignInButton mode="modal">
      <button className={`${buttonClass} px-4 py-2 rounded-md transition-colors text-base font-medium`}>
        Sign In
      </button>
    </SignInButton>
  );
}

export default Header;
