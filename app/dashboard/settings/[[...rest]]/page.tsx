// app/dashboard/settings/page.tsx
"use client";

import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
        Settings
      </h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <UserProfile
          appearance={{
            variables: {
              colorPrimary: "#3B82F6", // Primary color
              colorText: "#1F2937", // Text color
              colorBackground: "#F9FAFB", // Background color
            },
            elements: {
              card: "bg-white shadow-md rounded-lg p-6", // Card styling
              button:
                "bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600", // Button styling
            },
          }}
        />
      </div>
    </div>
  );
}
