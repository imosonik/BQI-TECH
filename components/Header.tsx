"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Phone, User, ChevronDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileMenu } from "@/components/MobileMenu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  return (
    <>
      <div className="w-full fixed border-b top-0 left-0 z-50 bg-white rounded-b-[20px] shadow-md">
        {/* Utility Navigation */}
        <div className="w-full bg-white border-b border-gray-200 rounded-[15px]">
          <div className="container flex h-[40px] items-center justify-end px-6">
            <div className="hidden md:flex items-center gap-2">
              <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors">
                <Search className="h-[18px] w-[18px] text-gray-700" />
              </button>
              <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors">
                <Phone className="h-[18px] w-[18px] text-gray-700" />
              </button>
              <Link href="/login">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="flex items-center gap-1 rounded-[20px] bg-gray-100 hover:bg-gray-200 text-[14px] font-medium px-4 h-[36px]"
                >
                  <User className="h-4 w-4" />
                  User Login
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <header className="w-full border-b border-gray-200 rounded-[20px]">
          <div className="container flex h-[64px] items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-2 py-4">
              <Image
                src="/bqilogo.png"
                alt="BQI Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="flex items-center gap-1.5 text-[15px] font-medium hover:text-gray-600 rounded-md px-1 py-1.5">
                Home
              </Link>

              <Link href="/careers" className="flex items-center gap-1.5 text-[15px] font-medium hover:text-gray-600 rounded-md px-1 py-1.5">
                Careers
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1.5 text-[15px] font-medium hover:text-gray-600 rounded-md px-1 py-1.5">
                  Services
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-lg">
                  <Link href="/services/business-licensing">
                    <DropdownMenuItem className="text-[14px]">Business Licensing</DropdownMenuItem>
                  </Link>
                  <Link href="/services/professional-services">
                    <DropdownMenuItem className="text-[14px]">Professional Services</DropdownMenuItem>
                  </Link>
                  <Link href="/services/other-services">
                    <DropdownMenuItem className="text-[14px]">Other Services</DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1.5 text-[15px] font-medium hover:text-gray-600 rounded-md px-1 py-1.5">
                  About
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-lg">
                  <Link href="/about/expertise">
                    <DropdownMenuItem className="text-[14px]">Our Expertise</DropdownMenuItem>
                  </Link>
                  <Link href="/about/terms">
                    <DropdownMenuItem className="text-[14px]">Terms & Conditions</DropdownMenuItem>
                  </Link>
                  <Link href="/about/cookie-policy">
                    <DropdownMenuItem className="text-[14px]">Cookie Policy</DropdownMenuItem>
                  </Link>
                  <Link href="/about/contact">
                    <DropdownMenuItem className="text-[14px]">Contact Us</DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Mobile Actions */}
            <div className="flex items-center gap-3">
              <Button 
                className="bg-[#272055] hover:bg-[#31CDFF] rounded-[20px] text-[14px] font-medium px-5 h-[36px]"
              >
                Apply Now
              </Button>
              <button 
                className="md:hidden p-2 relative z-50"
                onClick={toggleMenu}
              >
                <motion.div
                  animate={isMobileMenuOpen ? "open" : "closed"}
                  className="relative w-6 h-6"
                >
                  <motion.span
                    className="absolute w-6 h-0.5 bg-gray-800 transform-gpu"
                    variants={{
                      open: { rotate: 45, y: 8 },
                      closed: { rotate: 0, y: 2 }
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="absolute w-6 h-0.5 bg-gray-800 transform-gpu"
                    variants={{
                      open: { opacity: 0 },
                      closed: { opacity: 1 }
                    }}
                    transition={{ duration: 0.2 }}
                    style={{ top: "50%", y: "-50%" }}
                  />
                  <motion.span
                    className="absolute w-6 h-0.5 bg-gray-800 transform-gpu"
                    variants={{
                      open: { rotate: -45, y: -8 },
                      closed: { rotate: 0, y: -2 }
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              </button>
            </div>
          </div>
        </header>
      </div>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  )
}