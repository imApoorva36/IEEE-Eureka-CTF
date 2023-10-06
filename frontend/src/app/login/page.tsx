'use client'

import { useState } from 'react'
import s from './login.module.css'
import ENDPOINT from '@/helpers/endpoint'
import { useRouter } from 'next/navigation';

// Import necessary dependencies
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); // Initialize the router object

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const res = await fetch(ENDPOINT + '/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,  // Use email as the username
                    password,
                }),
            });

            if (res.status === 400) {
                alert('Wrong credentials');
            } else if (res.ok) {
                const data = await res.json();
                // Save the JWT token to cookies or local storage
                document.cookie = `access_token=${data.access}`;
                document.cookie = `refresh_token=${data.refresh}`;
                
                // Redirect to the desired page on successful login
                router.push('/teams');
            }
        } catch (error) {
            console.error('Login error:', error);
        }

        setEmail('');
        setPassword('');
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
    );
}
