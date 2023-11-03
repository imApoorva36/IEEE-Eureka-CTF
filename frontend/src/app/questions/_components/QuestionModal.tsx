import Question from "@/models/Question"
import s from "./QuestionModal.module.css"

type Props = { question: Question, close: () => void}

export default function QuestionModal ({ question, close } : Props) {
    return (
        <div className={s.container}>
            <div className={s.modal}>
                <div className={s.content}>
                    <h2>{question.title}</h2>
                    <p>{question.text}</p>
                </div>
            </div>
        </div>
    )
}