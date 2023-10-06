'use client'

import { useState } from 'react'
import s from './login.module.css'
import ENDPOINT from '@/helpers/endpoint'
import { useRouter } from 'next/router'

export default function Login() {
	let [email, setEmail] = useState('')
	let [password, setPassword] = useState('')

	let [loading, setLoading] = useState(false)
	let [error, setError] = useState(false)

	let router = useRouter()

	async function submit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		setLoading(true)
		setError(false)

		let res = await fetch(ENDPOINT + '/login', {
			method: 'POST',
			body: JSON.stringify({ email, password })
		})
		
		if (res.status == 400) {
			setError(true)
			setLoading(false)
		} else {
			let data = await res.json()
			document.cookie = `user=${data.jwt}`
			router.push("/questions")
		}


		setEmail('')
		setPassword('')
	}

	return (
		<main className={`${s.login} pd-top`}>
			<form onSubmit={submit}>
				<label htmlFor="email">Email: </label>
				<input
					type="text"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<br />
				<br />

				<label htmlFor="password">Password: </label>
				<input
					type="text"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<br />
				<br />

				<button type="submit">Submit</button>
				
				<br />

				{ loading ? <p>loading</p> : null }
				{ error ? <p>wrong credentials</p> : null }

			</form>
		</main>
	)
}
