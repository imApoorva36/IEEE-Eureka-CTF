"use client";

import React from 'react'
import ENDPOINT from '@/helpers/endpoint'
import { useState, useEffect } from 'react'
import styles from '../questions.module.css'
import { notFound } from 'next/navigation'
import Question from '@/models/Question'
import QuestionsGrid from '../_components/QuestionsGrid'
import { useCookies } from 'react-cookie'
import { useAuth } from '../../useAuth'

export default function Page({ params }: { params: { slug: string } }) {

  useAuth()
  const [cookies] = useCookies(['access_token'])
  const [questions, setQuestions] = useState<Question[]>([])


  useEffect(() => {
    const fetchData = async () => {
        try {
            const access_token = cookies.access_token
            const res = await fetch(`${ENDPOINT}/questions/?category=${params.slug}`, {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
              next: { revalidate: 0 }
            })

            if (res.status === 402) {
                throw new Error('402')
            }
            if (res.status === 403) {
                throw new Error('403')
            }
            if (res.status === 400) {
                throw new Error('400')
            }

            const data = await res.json()
            setQuestions(data)
        } catch (err) {
            console.log(err)
        }
    }

    fetchData()
}, [cookies.access_token])

  if (!params.slug) {
    return notFound()
  }
  else {
    // slug must be one of : 1,2,3,4,5,6,7
    const sectionNumber = parseInt(params.slug)
    if (sectionNumber >= 1 && sectionNumber <= 7) {
      return (
        <main className={styles.questions}>
          <h1>Section {sectionNumber}</h1>
          <p>Questions for section {sectionNumber} will be displayed here</p>

          <QuestionsGrid questions={questions} />

        </main>
      )
    }
    else {
      return notFound()
    }
  }
}