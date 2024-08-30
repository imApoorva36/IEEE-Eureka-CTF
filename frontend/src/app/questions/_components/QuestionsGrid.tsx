"use client"

import Question from "@/models/Question";
import s from './QuestionsGrid.module.css'
import { useState } from "react";
import QuestionCard from "./QuestionCard";
import QuestionModal from "./QuestionModal";

export default function QuestionsGrid ({ questions, fetchData } : { questions: Question[], fetchData: () => void }) {
    let [ selected, setSelected ] = useState<number | false>(false)
    return (
        <>
            {
                selected !== false ?
                    <QuestionModal 
                        question={questions[selected]}
                        close = {() => {
                            setSelected(false)
                            fetchData()
                            console.log('fetching data')
                        }}
                    />
                : null
            }

            <div className={s.grid}>
                {
                    questions.map((q, i) => 
                        <QuestionCard key={q.id} question={q} select={() => setSelected(i)}/>
                    )
                }
            </div>
        </>
    )
}