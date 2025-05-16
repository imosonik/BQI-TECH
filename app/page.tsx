'use client';

import { useEffect, useState } from 'react';
import { useAuth } from "@clerk/nextjs";
import ClientHomePage from "@/components/ClientHomePage";
import { ChatbotWidget } from "@/components/ChatbotWidget";

export default function HomePage() {
  const { userId } = useAuth();
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data client-side after component mounts
    fetch('/api/blog-posts')
      .then(res => res.json())
      .then(data => {
        setBlogPosts(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching blog posts:', err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <ClientHomePage userId={userId} />
      <ChatbotWidget />
    </>
  );
}

// Metadata removed from client component
