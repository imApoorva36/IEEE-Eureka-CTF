import Question from "@/models/Question"
import s from "./QuestionModal.module.css"
import { useState } from "react"
import ENDPOINT from "@/helpers/endpoint"
import { useCookies } from "react-cookie"

type Props = { question: Question, close: () => void}

export default function QuestionModal ({ question, close } : Props) {
    let [ answer, setAnswer ] = useState("")
    let [ errorText, setErrorText ] = useState("")
    let [ correct, setCorrect ] = useState(false)

    const [cookies] = useCookies(['access_token']);
    const access_token = cookies.access_token;
    
    async function submit () {
        let res = await fetch(ENDPOINT + "/response/", {
            method: "POST",
            body: JSON.stringify({
                flag: answer,
                id: question.id
            }),
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': "application/json"
            }
        })
        
        if (res.status == 400) {
            setErrorText("wrong answer :(")
        } else if (res.status == 404) {
            setErrorText("you have already answered this question")
        } else if (!res.ok) {
            setErrorText("some error occured")
        } else {
            setErrorText("")
            setCorrect(true)
        }
    }
    
    return (
        <div className={s.container} onClick={close}>
            <div className={s.modal} onClick={e => e.stopPropagation()}>
                <div className={s.content}>
                    <h2>{question.title}</h2>
                    <p>{question.text}</p>
                </div>
                <div className={s.bottom}>
                    {
                        question.is_answered ?
                        null :
                        <>
                            <input type="text" value={answer} onChange={e => setAnswer(e.target.value)} disabled={correct} />
                            <button onClick={submit}>Answer</button>
                            <span id={s.correct}>{ correct ? "✔" : "" }</span>
                            <p id={s.error}>{errorText}</p>
                        </>
                    }
                    <div className={s.points}>
                        {
                            question.is_answered ? "✔" : ""
                        }
                        &nbsp;&nbsp;&nbsp;
                        { question.points } Points
                    </div>
                </div>
                <span className="material-symbols-outlined" id = {s.close} onClick={close}>close</span>
            </div>
        </div>
    )
}