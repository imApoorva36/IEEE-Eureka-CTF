"use client";

import React, { Suspense, useEffect, useState } from 'react'
import ENDPOINT from '@/helpers/endpoint'
import styles from '../questions.module.css'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import loadingAnimation from '@/components/loading.json';

import { useCookies } from 'react-cookie'
import Question from '@/models/Question'
import QuestionsGrid from '../_components/QuestionsGrid'
import { Sections } from '@/models/Team';

export default function Page({ params }: { params: { slug: string } }) {
  const [cookies] = useCookies(['access_token'])
  const [questions, setQuestions] = useState<Question[]>([])
  const [error, setError] = useState<string | null>(null)
  const [sectionsData, setSectionsData] = useState<Sections[]>();
  const fetchData = async () => {
    try {
      const access_token = cookies.access_token;
      const res = await fetch(`${ENDPOINT}/questions/?category=${params.slug}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        next: { revalidate: 0 }
      });

      if ([402, 403, 400].includes(res.status)) {
        setError(res.status.toString());
        return;
      }

      const data = await res.json();
      setQuestions(data);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchSectionsData = async () => {
    try {
      const access_token = cookies.access_token;
      const res = await fetch(`${ENDPOINT}/sections/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        next: { revalidate: 0 }
      });

      if (res.ok) {
        const data = await res.json();
        setSectionsData(data);
      } else {
        console.error('Failed to fetch sections data');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchSectionsData();
  }, [cookies.access_token, params.slug]);

  if (!params.slug || error) {
    return notFound();
  }

  const sectionNumber = parseInt(params.slug);
  if (sectionNumber < 1 || sectionNumber > 7) {
    return notFound();
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
  );
}
