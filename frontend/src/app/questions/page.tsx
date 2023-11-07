import ENDPOINT from '@/helpers/endpoint'
import s from './questions.module.css'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Question from '@/models/Question'
import QuestionsGrid from './_components/QuestionsGrid'

export default async function Questions () {
    let access_token = cookies().get("access_token")?.value

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
        redirect("/login")
    }
}