// Import necessary dependencies
'use client'

import { useState } from 'react'
import s from './register.module.css'
import { useRouter } from 'next/navigation';
import ENDPOINT from '@/helpers/endpoint'

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [member1, setMember1] = useState('');
    const [member2, setMember2] = useState('');
    const [member3, setMember3] = useState('');
    const [contact, setContact] = useState('');
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
                    member1,
                    member2,
                    member3,
                    contact,
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
                alert('User Registration Successful!!')
                router.push('/login');
                // Redirect to another page or update your UI accordingly
            }
        } catch (error) {
            console.error('Registration error:', error);
        }

        setUsername('');
        setPassword('');
        setMember1('');
        setMember2('');
        setMember3('');
        setContact('');
    }

    return (
        <main className={`${s.register} pd-top`}><br />
            <h2>Welcome to Register Page, enter your details to be Registered!!</h2><br /><br />
            <form onSubmit={submit}>
                <div className={s.formGroup}>
                    <label>Username/Team Name: </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className={s.formGroup}>
                    <label>Team Member 1 Name: </label>
                    <input
                        type="text"
                        value={member1}
                        onChange={(e) => setMember1(e.target.value)}
                    />
                </div>
                <div className={s.formGroup}>
                    <label>Team Member 2 Name: </label>
                    <input
                        type="text"
                        value={member2}
                        onChange={(e) => setMember2(e.target.value)}
                    />
                </div>

                <div className={s.formGroup}>
                    <label>Team Member 3 Name: </label>
                    <input
                        type="text"
                        value={member3}
                        onChange={(e) => setMember3(e.target.value)}
                    />
                </div>

                <div className={s.formGroup}>
                    <label>Contact No.: </label>
                    <input
                        type="text"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
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
