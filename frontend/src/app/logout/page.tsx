'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import s from './logout.module.css'
import Cookies from 'js-cookie';

export default function Logout() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    async function logout() {
      setLoggingOut(true); // Set the logging out state to true

      // Simulate a delay (you can remove this in a real implementation)
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Remove the authentication tokens from cookies or local storage
      document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('username');
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      Cookies.remove('username');
      await new Promise((resolve) => setTimeout(resolve, 100));
      setLoggingOut(false); // Reset the logging out state
      router.push('/login');
    }

    logout();
  }, [router]);

  return (
    <main>
      {loggingOut ? (
        <div className={s.loadingspinner}>
          Logging Out...
        </div>
      ) : (
        <p>Logging out...</p>
      )}
    </main>
  );
}
