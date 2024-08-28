'use client';
import Cookies from 'js-cookie';
import Link from 'next/link';
import s from './home.module.css';
import { Lexend } from 'next/font/google';
import { League_Spartan } from 'next/font/google';
import Design from '@/components/Design';
import { Suspense, useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '@/components/loading.json'; // Ensure you have a Lottie animation file

const lexend = Lexend({ subsets: ['latin'] });
const league_spartan = League_Spartan({ subsets: ['latin'] });

export default function Home() {
  const [username, setUsername] = useState<string | undefined>(undefined);

  useEffect(() => {
    const cookieUsername = Cookies.get('username');
    setUsername(cookieUsername);
  }, []);

  return (
    <main className={s.home + ' ' + lexend.className}>
      <Design />
      <Suspense fallback={<Lottie animationData={loadingAnimation} loop={true} />}>
        <div className={s.content}>
          <h1 className={s.title}>IEEE Code-Red 2024</h1>
          <p className={s.subtitle}>Get ready for action!</p>
          {username && (
            <h2 className={s.welcomeTeam}>
              Welcome to the Code-Red, TEAM <span>{username}</span>!
            </h2>
          )}

          <div className={s.buttons}>
            {!username && (
              <Link href="/login" className={s.button}>Login</Link>
            )}
            {username && (
              <>
                <Link href="/question-map" className={s.button}>Questions</Link>
                <Link href="/logout" className={s.button}>Logout</Link>
              </>
            )}
          </div>
        </div>
      </Suspense>
    </main>
  );
}
