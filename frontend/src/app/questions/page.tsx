"use client"

import ENDPOINT from '@/helpers/endpoint'
import s from './questions.module.css'
import { useEffect, useState } from 'react'
import Question from '@/models/Question'
import QuestionsGrid from './_components/QuestionsGrid'
import { useCookies } from 'react-cookie'
import { useAuth } from '../useAuth'

export default function Questions() {
    useAuth()
    const [cookies] = useCookies(['access_token'])
    const [questions, setQuestions] = useState<Question[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const access_token = cookies.access_token
                const res = await fetch(`${ENDPOINT}/questions/`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                    next: { revalidate: 0 }
                })

                if (res.status === 402) {
                    throw new Error('402')
                }

                const data = await res.json()
                setQuestions(data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [cookies.access_token])

    const filterQuestionsByDifficulty = (minPoints: number, maxPoints: number) => {
        return questions.filter(
            q => q.points >= minPoints && q.points <= maxPoints
        )
    }

    return (
        <main className={`${s.questions} pd-top`}>
            <h1 className={s.heading}>Questions</h1>
            <h2 className={s.subheading}>Easy</h2>
            <QuestionsGrid questions={filterQuestionsByDifficulty(0, 35)} />
            <h2 className={s.subheading}>Medium</h2>
            <QuestionsGrid questions={filterQuestionsByDifficulty(36, 64)} />
            <h2 className={s.subheading}>Hard</h2>
            <QuestionsGrid questions={filterQuestionsByDifficulty(65, Infinity)} />
        </main>
    )
}
