import Question from '@/models/Question'
import s from './QuestionCard.module.css'

type Props = { question: Question; select: () => void }

export default function QuestionCard({ question, select }: Props) {
	// let text = question.text
	// if (text.length > 200) {
	//     text = text.slice(0, 200) + "..."
	// }
	return (
		<div className={s.card} onClick={select}>
			<h2>{question.title}</h2>
            <p>{question.user_response_count} teams solved</p>
			{/* <p>{text}</p> */}
			<div className={`${s.points} ${question.is_answered ? s.answered : ""}`}>
				{question.is_answered ? '✔' : ''} &nbsp;&nbsp;
				{question.points} Points
			</div>
		</div>
	)
}
