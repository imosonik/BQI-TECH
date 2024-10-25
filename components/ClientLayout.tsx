"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (remove this in production and use real loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <body className="min-h-screen flex flex-col">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* <div className="bg-teal-600 text-white text-center py-2">
            Welcome to the new BQI website!
          </div> */}
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </>
      )}
    </body>
  );
}
