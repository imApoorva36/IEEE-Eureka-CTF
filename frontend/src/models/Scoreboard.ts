const NICKNAMES = [
	'NICKNAME1',
	'NICKNAME2',
	'NICKNAME3',
	'NICKNAME4',
	'NICKNAME5',
	'NICKNAME6',
	'NICKNAME7',
	'NICKNAME8',
	'NICKNAME9',
	'NICKNAME10'
]

export default class Scoreboard {
    me: number
	leaderboard: { position: number; nickname: string; score: number }[]

	constructor(scores: number[]) {
		this.me = scores[0]

		this.leaderboard = scores
			.slice(1)
			.map((score, i) => ({
				position: i + 1,
				nickname: NICKNAMES[i],
				score: score
			}))
	}
}
