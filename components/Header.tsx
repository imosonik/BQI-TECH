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
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"

export default function Header() {
  const { userId, isSignedIn } = useAuth()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  const handleClick = () => {
    if (isSignedIn) {
      router.push("/dashboard")
    } else {
      router.push("/login")
    }
  }

  return (
    <>
      <div className="w-full fixed border-b top-0 left-0 right-0 z-50 bg-white rounded-b-[20px] shadow-md overflow-hidden">
        {/* Utility Navigation */}
        <div className="w-full bg-white border-b border-gray-200 ">
          <div className="container flex h-[40px] items-center justify-end px-6 max-w-[1400px] mx-auto">
            <div className="hidden md:flex items-center gap-2">
              <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors">
                <Search className="h-[18px] w-[18px] text-gray-700" />
              </button>
              <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors">
                <Phone className="h-[18px] w-[18px] text-gray-700" />
              </button>
              <Button 
                variant="secondary" 
                size="sm" 
                className="flex items-center gap-1 rounded-[20px] bg-gray-100 hover:bg-gray-200 text-[14px] font-medium px-4 h-[36px]"
                onClick={handleClick}
              >
                <User className="h-4 w-4" />
                {isSignedIn ? "Dashboard" : "User Login"}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <header className="w-full border-b border-gray-200">
          <div className="container flex h-[80px] items-center justify-between px-6 max-w-[1400px] mx-auto">
            <Link href="/" className="flex items-center gap-2 py-4">
              <Image
                src="/bqilogo.png"
                alt="BQI Logo"
                width={190}
                height={56}
                className="h-14 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link 
                href="/" 
                className="flex items-center gap-1.5 text-[16px] font-medium hover:text-gray-600 rounded-md px-2 py-2"
              >
                Home
              </Link>

              <Link 
                href="/careers" 
                className="flex items-center gap-1.5 text-[16px] font-medium hover:text-gray-600 rounded-md px-2 py-2"
              >
                Careers
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger 
                  className="flex items-center gap-1.5 text-[16px] font-medium hover:text-gray-600 rounded-md px-2 py-2"
                >
                  Services
                  <ChevronDown className="h-5 w-5 opacity-70" />
                </DropdownMenuTrigger>
                
                <DropdownMenuContent className="rounded-lg">
                <Link href="/services">
                    <DropdownMenuItem className="text-[15px] py-2">Our Services</DropdownMenuItem>
                  </Link>
                  <Link href="/services/business-licensing">
                    <DropdownMenuItem className="text-[15px] py-2">Business Licensing</DropdownMenuItem>
                  </Link>
                  <Link href="/services/professional-services">
                    <DropdownMenuItem className="text-[15px] py-2">Professional Services</DropdownMenuItem>
                  </Link>
                  <Link href="/services/other-services">
                    <DropdownMenuItem className="text-[15px] py-2">Other Services</DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1.5 text-[15px] font-medium hover:text-gray-600 rounded-md px-1 py-1.5">
                  About
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-lg">
                <Link href="/about">
                    <DropdownMenuItem className="text-[14px]">About Us</DropdownMenuItem>
                  </Link>
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
                onClick={() => router.push("/careers")}
              >
                Apply Now
              </Button>
              <motion.button 
                className="md:hidden p-2 relative z-50 hover:bg-gray-100 rounded-full transition-colors"
                onClick={toggleMenu}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Menu 
                  className={`w-6 h-6 transition-colors duration-200 ${
                    isMobileMenuOpen ? 'text-[#31CDFF]' : 'text-[#272055]'
                  }`}
                />
              </motion.button>
            </div>
          </div>
        </header>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-[120px] w-full" />

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  )
}