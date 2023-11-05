'use client'
import Cookies from 'js-cookie';
import Link from 'next/link';
import s from './home.module.css';

export default function Home() {
  const username = Cookies.get('username');
  console.log('Username from cookie:', username);

  return (
    <main className={`${s.home} pd-top`}>
      <div className={s.content}>
        <h1 className={s.title}>IEEE Eureka CTF 2023</h1>
        <p className={s.subtitle}>Get ready for action!</p>
        {username && (
          <h2 className={s.welcomeTeam}>
            Welcome to the EUREKA CTF TEAM <span>{username}</span>!
          </h2>
        )}
        <div className={s.buttons}>
			<Link href="/login" className={s.button}>Login</Link>
			<Link href="/register" className={s.button}>Register</Link>
            <Link href="/logout" className={s.button}>Logout</Link>
        </div>
      </div>
    </main>
  );
}
