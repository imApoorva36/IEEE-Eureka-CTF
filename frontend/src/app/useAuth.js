// useAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export function useAuth() {
  const router = useRouter();
  useEffect(() => {
    
    const token = localStorage.getItem('jwtToken') || getCookie('access_token');
    if (!token) {
      router.push('/login');
    }
  }, []);
  return null; // This hook doesn't return any value
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
}
    