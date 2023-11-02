import ENDPOINT from '@/helpers/endpoint'
import s from './questions.module.css'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Question from '@/models/Question'

export default async function Questions () {
    let access_token = cookies().get("access_token")?.value
    console.log(access_token)

    try {
        let res = await fetch(ENDPOINT + "/questions/", {
            next: { revalidate: 60 },
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        })

        if (res.status == 402) {
            throw new Error("402")
        }

        
        let data: Question[] = await res.json()
        console.log(data)

        return (
            <main className={`${s.questions} pd-top`}>
                <ul>
                    {data.map(q => {
                        return <li>{q.title}</li>
                    })}
                </ul>
            </main>
        )


    } catch (err) {
        console.log(err)
        redirect("/login")
        return <></>
    }
}