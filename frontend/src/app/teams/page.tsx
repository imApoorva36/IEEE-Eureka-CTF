import { TeamBrief } from '@/models/Team'
import s from './teams.module.css'
import Link from 'next/link'

export default async function Teams() {
	let teams: TeamBrief[] = await fetch('http://localhost:8000/api/teams').then((res) => res.json())

	return (
		<main className={s.teams}>
			<h1>Teams</h1>
			<ul>
				{teams.map((team) => (
					<li key = {team.teamid}>
						<Link href={`/teams/${team.teamid}`}>{team.teamname}</Link>
					</li>
				))}
			</ul>
		</main>
	)
}
