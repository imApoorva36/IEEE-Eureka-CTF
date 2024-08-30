export default interface Question {
    id: string
    title: string
    text: string
    hints: string
    points: number
    link: string
    is_answered:boolean
    user_response_count: number
}