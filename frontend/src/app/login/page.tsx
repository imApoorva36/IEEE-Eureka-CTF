'use client'
import { useState } from 'react'
import s from './login.module.css'
import ENDPOINT from '@/helpers/endpoint'
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

export default function Login() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); // Initialize the router object
    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token', 'username']);

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
            console.log(res);
            if (res.status === 401) {
                alert('Wrong credentials');
            } else if (res.ok) {
                const data = await res.json();
                // Save the JWT token to cookies or local storage
                setCookie('access_token', data.access, { path: '/' });
                setCookie('refresh_token', data.refresh, { path: '/' });
                setCookie('username', email, { path: '/' });
                const username=email;
                setUsername(email);
                router.push('/teams');
                alert('Login Successfull!')
            }
        } catch (error) {
            console.error('Login error:', error);
        }

        setEmail('');
        setPassword('');
    }

    return (
        <main className={`${s.login} pd-top`}>
            <h2>Wecome to Login Page, enter your details to be logged into your account!!</h2><br />
 			<form onSubmit={submit}>
                <div className={s.formGroup}>
                    <label htmlFor="email">Username: </label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={s.formGroup}>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
				<button type="submit">Submit</button>
			</form>
		</main>
    );
}
