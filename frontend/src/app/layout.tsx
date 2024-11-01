import "./globals.css";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { League_Spartan } from "next/font/google";

import Link from "next/link";

const lexend = Lexend({ subsets: ["latin"] });
const league_spartan = League_Spartan({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "IEEE Eureka",
	description: "Capture the Flag - IEEE Eureka 2023",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
				/>
			</head>
			<body className={lexend.className}>
				<header>
					<Link href="https://ieee.nitk.ac.in">
						<img className="logo" src={"/assets/images/logo.png"} />
					</Link>
					<nav>
						<ul>
							<li>
								<Link href="/">HOME</Link>
							</li>
							<li>
								<Link href="/teams">TEAMS</Link>
							</li>
							<li>
								<Link href="/questions">QUESTIONS</Link>
							</li>
							<li>
								<Link href="/scoreboard">SCOREBOARD</Link>
							</li>
						</ul>
					</nav>
				</header>
				{children}
				{/* <footer>
					<nav className='foot'>
						Made with <span style={{ color: 'red' }}>❤</span> by Eureka Team, IEEE NITK
					</nav>
				</footer> */}
			</body>
		</html>
	);
}
