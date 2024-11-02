import Question from "@/models/Question";
import s from "./QuestionCard.module.css";
import Image from "next/image";

type Props = { question: Question; select: () => void };

export default function QuestionCard({ question, select }: Props) {
	// let text = question.text
	// if (text.length > 200) {
	//     text = text.slice(0, 200) + "..."
	// }
	return (
		<div className={s.card} onClick={select}>
			<img
				src={
					question.is_answered
						? "/assets/images/mario-pole2.png"
						: "/assets/images/question-block.png"
				}
				alt=""
			/>

			<div className={s.dot1}></div>
			<div className={s.dot2}></div>
			<div className={s.dot3}></div>

			<h2>{question.title}</h2>
			<p>{question.user_response_count} teams solved</p>
			{/* <p>{text}</p> */}
			<div className={`${s.points} ${question.is_answered ? s.answered : ""}`}>
				{question.is_answered ? "✔" : ""} &nbsp;&nbsp;
				{question.points} Points
			</div>
		</div>
	);
}
