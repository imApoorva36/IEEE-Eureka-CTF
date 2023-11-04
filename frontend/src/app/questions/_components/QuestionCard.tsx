import Question from "@/models/Question"
import s from './QuestionCard.module.css'

type Props = { question: Question, onClick: () => void }

export default function QuestionCard ({ question, onClick } : Props) {
    console.log(question);
    let text = question.text
    if (text.length > 200) {
        text = text.slice(0, 200) + "..."
    }
    return (
        <div className={s.card} onClick={() => onClick()} >
            <h2>{question.title}</h2>
            <p>{text}</p>
            <div>{question.points} Points</div>
            <div>{question.is_answered?"Answered Already":"Not Answered"}</div>
            <div>Users solved : {question.user_response_count}</div>
        </div>
    )
}