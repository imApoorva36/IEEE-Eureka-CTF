import { TeamBrief } from '@/models/Team'
import s from './teams.module.css'
import Link from 'next/link'
import ENDPOINT from '@/helpers/endpoint'

export default async function Teams() {
	let teams: TeamBrief[] = await fetch(ENDPOINT + '/teams/', {
        next: { revalidate: 30 }
    }).then((res) => res.json())
	.catch(err => console.log(err))

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
