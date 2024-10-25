"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const videos = [
  "/hero-background.mp4",
  "/hero-background-2.mp4",
  "/hero-background-3.mp4",
]

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    beforeChange: (current: number, next: number) => setActiveIndex(next),
  }

  return (
    <section className="relative h-screen overflow-hidden">
      <Slider {...settings} className="h-full">
        {videos.map((video, index) => (
          <div key={index} className="h-screen">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover"
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </Slider>
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
              BQI Tech
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white">
            <TypeAnimation
              sequence={["Innovate", 2000, "Create", 2000, "Transform", 2000]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              style={{ color: "#4F46E5" }}
            />
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Empowering businesses through cutting-edge technology solutions
          </p>
          <Link
            href="/sign-up"
            className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </section>
  )
}