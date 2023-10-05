'use client'

import { useState } from 'react'
import s from './login.module.css'
import ENDPOINT from '@/helpers/endpoint'

export default function Login() {
	let [email, setEmail] = useState('')
	let [password, setPassword] = useState('')

	async function submit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		let res = await fetch(ENDPOINT + '/login', {
			method: 'POST',
			body: JSON.stringify({ email, password })
		})
		
		if (res.status == 400) {
			alert("wrong credentials")
		} else {
			let data = await res.json()
			document.cookie = `user=${data.jwt}`
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
			</form>
		</main>
	)
}
