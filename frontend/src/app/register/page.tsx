// // Import necessary dependencies
// 'use client'

// import { useState } from 'react'
// import s from './login.module.css'
// import ENDPOINT from '@/helpers/endpoint'

// export default function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     async function submit(e: React.FormEvent<HTMLFormElement>) {
//         e.preventDefault();

//         try {
//             const res = await fetch(ENDPOINT + '/api/token/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     username: email,  // Use email as the username
//                     password,
//                 }),
//             });

//             if (res.status === 400) {
//                 alert('Wrong credentials');
//             } else if (res.ok) {
//                 const data = await res.json();
//                 // Save the JWT token to cookies or local storage
//                 document.cookie = `access_token=${data.access}`;
//                 document.cookie = `refresh_token=${data.refresh}`;
//                 // Redirect to another page or update your UI accordingly
//             }
//         } catch (error) {
//             console.error('Login error:', error);
//         }

//         setEmail('');
//         setPassword('');
//     }

//     return (
//         <main className={`${s.login} pd-top`}>
//             <form onSubmit={submit}>
//                 {/* ... (Your input fields and button) */}
//             </form>
//         </main>
//     );
// }
