"use client"

import Question from "@/models/Question";
import s from './QuestionsGrid.module.css'
import { useState } from "react";
import QuestionCard from "./QuestionCard";
import QuestionModal from "./QuestionModal";
import QuestionResponse from "@/models/Responses";

export default function QuestionsGrid ({ questions, fetchData, fetchResponses,  responses } : { questions: Question[], fetchData: () => void, fetchResponses: () => void, responses: QuestionResponse[] }) {
    let [ selected, setSelected ] = useState<number>(-1)
    
    return (
        <>
            {
                selected !== -1 ?
                    <QuestionModal 
                        question={questions[selected]}
                        response = {responses.find(r => r.question == questions[selected].id)}
                        fetchResponses={fetchResponses}
                        close = {() => {
                            setSelected(-1)
                            fetchData()
                            fetchResponses()
                        }}
                    />
                : null
            }

            <div className={s.grid}>
                {   questions.length > 0 &&
                    questions.map((q, i) => 
                        <QuestionCard key={q.id} question={q} select={() => setSelected(i)}/>
                    )
                }
            </div>
        </>
    )
}