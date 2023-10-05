import ENDPOINT from '@/helpers/endpoint'
import Scoreboard from '@/models/Scoreboard'
import s from './scoreboard.module.css'

export default async function ScoreboardPage () {
	// let scores: number[] = await fetch(ENDPOINT + '/scoreboard')
    // .then((res) =>
	// 	res.json()
	// )

	let scores = [100, 150, 140, 130, 110, 100]

	let scoreboard = new Scoreboard(scores)

	return (
		<main className = {`${s.scoreboard} pd-top`}>
			<h1>Scoreboard</h1>
			<br />
			<h2>Your score: {scoreboard.me}</h2>
			<br /><br />
			<ul>
				{scoreboard.leaderboard.map(pos => (
					<li>{pos.position}. {pos.nickname} - {pos.score}</li>
				))}
			</ul>
		</main>
	)
}
