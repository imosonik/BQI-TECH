import { headers } from "next/headers"
import { ComingSoon } from "@/components/ComingSoon"
import ClientHomePage from "@/components/ClientHomePage"
import { ChatbotWidget } from "@/components/ChatbotWidget"
import { auth } from "@clerk/nextjs/server"

export default async function HomePage() {
  const headersList = headers()
  const domain = headersList.get("host") || ""
  const { userId } = await auth()
  
  // Show coming soon page for bqitech.com
  if (domain.includes("bqitech.com")) {
    return <ComingSoon />
  }

  // Show full site for Netlify domain
  return (
    <>
      <ClientHomePage userId={userId} />
      <ChatbotWidget />
    </>
  )
}
