export interface TeamBrief {
	name:string
	teamid: string
	teamname: string
}

export interface TeamDetailed {
	id: string
	name: string
	member1: string
	member2: string
	member3:string
	contact:number
	highest_section_reached:number
	calculate_score:number
}

export interface Sections {
	section: number
	title: string
	description: string
	points_threshold: number
}

export interface TeamScores {
	team: string
	score: number
}
