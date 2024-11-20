// app/dashboard/settings/page.tsx
"use client";

import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
        Account Settings
      </h2>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <UserProfile
          appearance={{
            baseTheme: undefined,
            variables: {
              colorPrimary: "#2563eb",
              colorTextOnPrimaryBackground: "white",
              colorTextSecondary: "#4b5563",
              colorBackground: "#ffffff",
              colorInputBackground: "#f3f4f6",
              colorInputText: "#1f2937",
              colorDanger: "#ef4444",
              borderRadius: "0.5rem",
            },
            elements: {
              rootBox: "font-sans [&_div]:last-child:hidden",
              card: "shadow-none p-0",
              navbar: "hidden",
              navbarButton: "hidden",
              pageScrollBox: "p-6 [&_div]:last-child:hidden",
              formButtonPrimary: 
                "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md",
              formButtonReset: 
                "bg-white text-gray-600 hover:text-gray-800 border border-gray-200 hover:border-gray-300 font-medium py-2 px-4 rounded-lg transition-colors duration-200",
              formFieldInput: 
                "rounded-lg border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              formFieldLabel: "font-medium text-gray-700",
              headerTitle: "text-xl font-semibold text-gray-800",
              headerSubtitle: "text-gray-500",
              profileSectionTitle: "text-lg font-medium text-gray-800",
              profileSectionPrimaryButton: 
                "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white",
              alertText: "text-gray-600",
              developmentModeText: "hidden !important",
              developmentModeBadge: "hidden !important",
              developmentModeBox: "hidden !important",
              footerAction: "hidden",
              footer: "hidden",
              badge: "hidden",
              statusBadge: "hidden",
            },
          }}
        />
      </div>
    </div>
  );
}
