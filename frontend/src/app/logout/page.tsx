'use client'

import { useState } from 'react'
import s from './logout.module.css'
import ENDPOINT from '@/helpers/endpoint'
import { useRouter } from 'next/navigation';

export default function Logout() {
	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
	const router = useRouter(); // Initialize the router object

    async function logout() {
        // Remove the authentication tokens from cookies or local storage
        document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
		localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        // Redirect to the login page
        router.push('/login');
    }

    return (
        <main className={`${s.logout} pd-top`}>
            {/* Add a logout button */}
			<label htmlFor="Logout">Logout</label>
            <button onClick={logout}>Logout</button>
        </main>
    );
}
