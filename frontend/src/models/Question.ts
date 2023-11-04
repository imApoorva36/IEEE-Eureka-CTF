export default interface Question {
    id: string
    title: string
    text: string
    points: number
    link: string
    answered: boolean
    is_answered:boolean
    user_response_count: number
}