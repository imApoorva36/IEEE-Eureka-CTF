"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import s from "./home.module.css";
import { Lexend } from "next/font/google";
import { League_Spartan } from "next/font/google";

import Design from "@/components/Design";
import { useCookies } from "react-cookie";

const lexend = Lexend({ subsets: ["latin"] });
const league_spartan = League_Spartan({ subsets: ["latin"] });

export default function Home() {
	const username = Cookies.get("username");
	console.log("Username from cookie:", username);

	const [cookies] = useCookies(["access_token"]);
	const access_token = cookies.access_token;

	return (
		<main className={s.home + " " + lexend.className}>
			{/* <Design /> */}

			<video
				className={s.video}
				autoPlay
				loop
				playsInline
				poster="/assets/images/home-bg.png"
			>
				<source src="/assets/images/home.mp4" type="video/mp4" />
			</video>

			<div className={s.content}>
				<h1 className={s.title}>IEEE Eureka CTF 2024</h1>
				<p className={s.subtitle}>Get ready for action!</p>
				{username && (
					<h2 className={s.welcomeTeam}>
						Welcome to the EUREKA CTF TEAM <span>{username}</span>!
					</h2>
				)}
				{!username && (
					<div className={s.buttons}>
						{username && access_token ? (
							<Link href="/logout" className={s.button}>
								Logout
							</Link>
						) : (
							<Link href="/login" className={s.button}>
								Login
							</Link>
						)}

						{/* <Link href="/register" className={s.button}>Register</Link> */}
					</div>
				)}

				{username && (
					<div className={s.logoutButton}>
						<Link href="/logout" className={s.button}>
							Logout
						</Link>
					</div>
				)}
			</div>
		</main>
	);
}
