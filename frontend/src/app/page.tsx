import Link from 'next/link'
import s from './home.module.css'

export default function Home() {
	return (
		<main className = {`${s.home} pd-top`}>
			<div className = {s.content}>
				<h1>IEEE Eureka</h1>
				<p>Get ready for action!</p>
				<div className = {s.buttons}>
					<Link href = "/login">Login</Link>
					<Link href = "/register">Register</Link>
				</div>
			</div>
		</main>
	)
}
