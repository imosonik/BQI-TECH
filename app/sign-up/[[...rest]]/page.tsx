"use client"

import { SignUp } from "@clerk/nextjs"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { useEffect } from "react"

export default function SignUpPage() {
  const router = useRouter()

  useEffect(() => {
    toast.success("Welcome! Create your account to get started.", {
      icon: "✨",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    })
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#272055] to-[#1D1640] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-white mb-2"
          >
            Create Account
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-300"
          >
            Join us and unlock full access to our services
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-[#31CDFF] hover:bg-[#272055] text-white transition-all duration-200",
                card: "bg-transparent shadow-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: 
                  "border-gray-400 text-white hover:bg-white/10",
                socialButtonsBlockButtonText: "text-white",
                dividerLine: "bg-gray-600",
                dividerText: "text-gray-400",
                formFieldLabel: "text-gray-300",
                formFieldInput: 
                  "bg-white/10 border-gray-600 text-white placeholder-gray-400",
                footerActionLink: "text-[#31CDFF] hover:text-[#272055]",
                footerActionText: "text-gray-300",
                footer: "hidden",
                rootBox: "bg-transparent",
              },
              layout: {
                socialButtonsPlacement: "bottom",
                privacyPageUrl: "/privacy",
                termsPageUrl: "/terms",
                showOptionalFields: false,
              },
            }}
            redirectUrl="/dashboard"
            afterSignUpUrl="/dashboard"
            signInUrl="/login"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 space-y-4"
        >
          <p className="text-gray-400 text-sm">
            Protected by BQI security
          </p>
          <p className="text-gray-300">
            Already have an account?{" "}
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-[#31CDFF] hover:text-white cursor-pointer transition-colors"
              onClick={() => router.push('/login')}
            >
              Sign in here
            </motion.span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
} 