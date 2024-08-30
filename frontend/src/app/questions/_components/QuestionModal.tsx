import Question from "@/models/Question"
import s from "./QuestionModal.module.css"
import { useState } from "react"
import ENDPOINT from "@/helpers/endpoint"
import { useCookies } from "react-cookie"
import { ClipLoader } from "react-spinners"
import QuestionResponse from "@/models/Responses"

type Props = { question: Question, close: () => void, response: QuestionResponse | undefined, fetchResponses: () => void }

export default function QuestionModal ({ question, close, response, fetchResponses } : Props) {
    let [ answer, setAnswer ] = useState("")
    let [ errorText, setErrorText ] = useState("")
    let [ successText, setSuccessText ] = useState(question.is_answered ? "Already answered!" : "")
    let [ loading, setLoading ] = useState(false)

    let [ closing, setClosing ] = useState(false)

    const [cookies] = useCookies(['access_token']);
    const access_token = cookies.access_token;

    let answered = successText !== ""
    
    async function submit () {
        if (answered) return
        
        setLoading(true)
        setErrorText(" ")

        try {
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

            setLoading(false)
            
            if (res.status == 400) {
                setErrorText("wrong answer :(")
            } else if (res.status == 404) {
                setErrorText("you have already answered this question")
            } else if (!res.ok) {
                throw new Error()
            } else {
                setErrorText("")
                setAnswer("")
                setSuccessText("Correct!")
            }
        } catch (err) {
            setLoading(false)
            setErrorText("some error occured")
        }
        finally{
            fetchResponses()
        }
    }

    function handleClose () {
        setClosing(true)
        setTimeout(close, 300)
    }

    return (
        <div className={`${s.container} ${closing ? s.closing : ""}`} onClick={handleClose}>
            <div className={s.modal} onClick={e => e.stopPropagation()}>
                <div className={s.content}>
                    <h2>{question.title}</h2>
                    <div
                        className={s.textContent}
                    >
                    {
                        question.text.split("\n").map((text, i) => {
                            return <p key={i}>{text}</p>
                        })
                    }
                    </div>
                    {
                        question.link !== "" ?
                            <a target="_blank" href={question.link}>Link to Resources</a>
                        : null
                    }<br /><br />
                    {
                        question.show_hints && question.hints ?
                            <div
                                style={{
                                    border: "1px solid #333",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    backgroundColor: "#111",
                                }}
                            >
                                <h3>Hints</h3>
                                <br />
                                {
                                    question.hints.split("\n").map((text, i) => {
                                        return <p key={i}>{text}</p>
                                    })
                                }
                            </div>
                        : null
                    }
                </div>
                <div className={s.bottom}>
                    <div className={s.response}>
                        <div>
                            {/* attempts */}
                            {
                                response ? 
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        alignItems: "start",
                                    }}>
                                        <p>Attempts: {response.attempts} / 50</p>
                                        <p
                                            style={{
                                                whiteSpace: "nowrap",
                                            }}
                                        >Previous Response: 
                                            <span style={{ color: "red" }}>
                                                {'  ' + response.response}
                                            </span>
                                        </p>
                                    </div>
                                    : null
                            }
                        </div>
                        {
                            !response || (response && response.attempts < 50) ? <>
                                <div className={s.textbox}>
                                    <input type="text" value={answer} onChange={e => setAnswer(e.target.value)} disabled={answered} />
                                </div>
                                <div className={`${s.button} ${answered ? s.disabled : ""}`} onClick={submit}>Answer</div>
                            </>
                            : null
                        }
                        { 
                            loading ? 
                                <ClipLoader color = "#3489db" /> 
                            : null 
                        }
                        {
                            errorText !== "" ?
                                <p id={s.error}>{errorText}</p> 
                            : null
                        }
                        {
                            answered ?
                                <p id={s.success}>{successText}</p>
                            : null
                        }
                    </div>
                    <div className={s.points}>
                        {
                            answered ? "✔" : ""
                        }
                        &nbsp;&nbsp;&nbsp;
                        { question.points } Points
                    </div>
                </div>
                <span className="material-symbols-outlined" id = {s.close} onClick={handleClose}>close</span>
            </div>
        </div>
    )
}