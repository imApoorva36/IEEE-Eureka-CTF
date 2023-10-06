import { TeamDetailed } from '@/models/Team'
import s from './team.module.css'
import ENDPOINT from '@/helpers/endpoint'

export default async function Team({
	params
}: {
	params: { teamid: string }
}) {

	let team : TeamDetailed = await fetch(ENDPOINT + '/teams/'+ params.teamid + '/').then(res => res.json())
	
	return (
		<main className = {s.team}>
			<h1>{team.teamname}</h1>
			<p>{team.member1}</p>
			<p>{team.member2}</p>
		</main>
	)
}
