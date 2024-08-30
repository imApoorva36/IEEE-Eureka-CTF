"use client";

import React, { Suspense } from 'react'
import ENDPOINT from '@/helpers/endpoint'
import { useState, useEffect } from 'react'
import styles from '../questions.module.css'
import { notFound } from 'next/navigation'
import Question from '@/models/Question'
import QuestionsGrid from '../_components/QuestionsGrid'
import { useCookies } from 'react-cookie'
import { useAuth } from '../../useAuth'
import Lottie from 'lottie-react';
import loadingAnimation from '@/components/loading.json';
import { Sections } from '@/models/Team';

export default function Page({ params }: { params: { slug: string } }) {

  useAuth()
  const [cookies] = useCookies(['access_token'])
  const [questions, setQuestions] = useState<Question[]>([])
  const [error, setError] = useState<string | null>(null)
  const [sectionsData, setSectionsData] = React.useState<Sections[]>();

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
            setError('402')
        }
        if (res.status === 403) {
            setError('403')
        }
        if (res.status === 400) {
            setError('400')
        }

        const data = await res.json()
        setQuestions(data)
    } catch (err) {
        console.log(err)
    }
  }

  async function fetchSectionsData() {
    try {
      const access_token = cookies.access_token
      const response = await fetch(ENDPOINT + '/sections/', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        next: { revalidate: 0 }
      });
      if (response.ok) {
        const data = await response.json();
        setSectionsData(data);
      } else {
        console.error('Failed to fetch sections data');
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData()
    fetchSectionsData()
}, [cookies.access_token])

  if (!params.slug) {
    return notFound()
  }
  else {
    const sectionNumber = parseInt(params.slug) 
    if (sectionNumber >= 1 && sectionNumber <= 7) {
      if (error === '402' || error === '403' || error === '400') {
        return notFound()
      }
      return (
        <main className={styles.questions}>

          {/* back button to go to question-map */}
          <a href="/question-map" className={styles.backButton}>
            <svg xmlns="http://www.w3.org/2000/svg" height={'48px'} width={'48px'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Adventure Map
          </a>

          <h1>{sectionsData?.[sectionNumber - 1]?.title}</h1>
          <p>{sectionsData && sectionsData[sectionNumber - 1]?.description}</p>
          <br />  
          <br />  
          <Suspense fallback={<Lottie animationData={loadingAnimation} loop={true} />}>
            <QuestionsGrid questions={questions} fetchData={fetchData} />
          </Suspense>

        </main>
      )
    }
    else {
      return notFound()
    }
  }
}