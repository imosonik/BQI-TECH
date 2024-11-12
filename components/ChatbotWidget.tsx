"use client"

import { useEffect, useRef } from "react"

export function ChatbotWidget() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (iframeRef.current) {
        iframeRef.current.style.height = `${window.innerHeight * 0.7}px`
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[400px] rounded-lg shadow-lg bg-white overflow-hidden">
      <iframe
        ref={iframeRef}
        src="https://app.thinkstack.ai/bot/index.html?chatbot_id=67334193bde936bef06b2d4a"
        className="w-full border-0"
        style={{ minHeight: "500px" }}
      />
    </div>
  )
}
