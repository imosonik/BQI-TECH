import { useEffect, useRef } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export function useAutoLogout() {
  const { autoLogout } = useSettings();
  const { signOut } = useClerk();
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(async () => {
      await signOut();
      router.push('/');
    }, autoLogout * 60 * 1000); // Convert minutes to milliseconds
  };

  useEffect(() => {
    // Set up event listeners for user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    const handleActivity = () => {
      resetTimeout();
    };

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity);
    });

    // Initial timeout
    resetTimeout();

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [autoLogout]);
} 