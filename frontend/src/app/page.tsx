'use client'
import Cookies from 'js-cookie';

import Link from 'next/link'
import s from './home.module.css'

export default function Home() {
	const username = Cookies.get('username');
	console.log('Username from cookie:', username);
	return (
		<main className = {`${s.home} pd-top`}>
			<div className = {s.content}>
				<h1>IEEE Eureka</h1>
				<p>Get ready for action!</p><br />
				<h2>
				{username && ( <span>!!Welcome to the EUREKA CTF TEAM {username}!!</span> )}
				</h2><br />
				<div className = {s.buttons}>
					<Link href = "/login">Login</Link>
					<Link href = "/register">Register</Link>
					<Link href = "/logout">Logout</Link>
				</div>
			</div>
		</main>
	)
}