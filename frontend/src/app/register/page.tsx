// Import necessary dependencies
'use client'

import { useState } from 'react'
import s from './register.module.css'
import { useRouter } from 'next/navigation';
import ENDPOINT from '@/helpers/endpoint'

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const res = await fetch(ENDPOINT + '/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (res.status === 400) {
                alert('Wrong credentials or User already exists!!');
                console.log(await res.json());
            } else if (res.ok) {
                const data = await res.json();
                // Save the JWT token to cookies or local storage
                document.cookie = `access_token=${data.access}`;
                document.cookie = `refresh_token=${data.refresh}`;
                alert('User Resgistration Successful!!')
                router.push('/login');
                // Redirect to another page or update your UI accordingly
            }
        } catch (error) {
            console.error('Login error:', error);
        }

        setUsername('');
        setPassword('');
    }

    return (
        <main className={`${s.register} pd-top`}>
            <h2>Wecome to Register Page, enter your details to be Registered!!</h2><br />
 			<form onSubmit={submit}>
 				<label>Username: </label>
 				<input
					type="text"
					id="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
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
