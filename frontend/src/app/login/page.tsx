'use client'
import { useState } from 'react'
import s from './login.module.css'
import ENDPOINT from '@/helpers/endpoint'
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import Design from '@/components/Design';

export default function Login() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter(); // Initialize the router object
    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token', 'username']);

	let [loading, setLoading] = useState(false)
	let [error, setError] = useState('')

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            setLoading(true);
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
            if (res.status === 401) {
                console.log('Wrong credentials');
                setError('Invalid credentials');
                setTimeout(() => {
                    setError('');
                }, 5000);
            } else if (res.ok) {
                const data = await res.json();
                setCookie('access_token', data.access, { path: '/' });
                setCookie('refresh_token', data.refresh, { path: '/' });
                setCookie('username', email, { path: '/' });
                setUsername(email);
                window.location.href = '/question-map';
            }
        } catch (error) {
            setError('Backend down, try again later')
            setTimeout(() => {
                setError('');
            }, 5000);
            console.error('Login error:', error);
        }
        finally {
            setLoading(false);
        }

        setEmail('');
        setPassword('');
    }

    return (
        <main className={s.login}><br /><br />
            <Design/>
            <h2 className={s.welcome}>
                Login details are sent to your Registered Email    
            </h2>
            
            <br />
            
            <div className={s.content}> 
                <form onSubmit={submit}><br />
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
                    <div style={{textAlign: 'center'}}>
                        <button type="submit" disabled={loading}
                            style={{
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {
                                loading ? 'Loading...' : 'Login'
                            }
                        </button>
                    </div>
                    
                    <br />
                    
                    <div style={{textAlign: 'center'}}>
                        {error ? 
                            <span style={{color: 'red'}}>{error}</span>
                            : null
                        }
                    </div>

                </form>
            </div>

            <div style={{textAlign: 'center'}}>
            <p style={{color: 'white', fontSize: '20px', fontWeight: '700', textAlign: 'center', margin:'auto'}}>
                You will be redirected to the Questions after successful login
            </p>
            </div>
		</main>
    );
}
