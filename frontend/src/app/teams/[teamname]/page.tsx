import { TeamDetailed } from '@/models/Team'
'use client'
import s from './team.module.css'
import ENDPOINT from '@/helpers/endpoint'
import Cookies from 'js-cookie';

export default async function Team({
	params
}: {
	params: { teamname: string }
}) {
	const accessToken = Cookies.get('access_token');
	let team : TeamDetailed = await fetch(ENDPOINT + '/teams/', {
		headers: {
		  'Authorization': `Bearer ${accessToken}`,
		},
	  }).then(res => res.json())
	
	return (
		<main className = {s.team}>
			<h1>{team.teamname}</h1>
			<p>{team.member1}</p>
			<p>{team.member2}</p>
			<p>{team.member3}</p>
		</main>
	)
}

