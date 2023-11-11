"use client"

import ENDPOINT from '@/helpers/endpoint'
import s from './questions.module.css'
import { redirect } from 'next/navigation'
import Question from '@/models/Question'
import QuestionsGrid from './_components/QuestionsGrid'
import { useCookies } from 'react-cookie'
import { useAuth } from '../useAuth'

export default async function Questions () {
    useAuth()
    const [cookies] = useCookies(['access_token']);
    const access_token = cookies.access_token;

    try {
        let res = await fetch(ENDPOINT + "/questions/", {
            next: { revalidate: 0 },
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        })

        if (res.status == 402) {
            throw new Error("402")
        }

        
        let data: Question[] = await res.json()

        return (
            <main className={`${s.questions} pd-top`}>
                <h1 className={s.heading}>Questions</h1>
                <h2 className={s.subheading}>Easy</h2>
                <QuestionsGrid questions = {data.filter(q => q.points <= 35)} />
                <h2 className={s.subheading}>Medium</h2>
                <QuestionsGrid questions = {data.filter(q => q.points > 35 && q.points < 65)} />
                <h2 className={s.subheading}>Hard</h2>
                <QuestionsGrid questions = {data.filter(q => q.points >= 65)} />
            </main>
        )


    } catch (err) {
        console.log(err)
    }
}