'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ENDPOINT from '@/helpers/endpoint';
import s from './scoreboard.module.css';
import { useCookies } from 'react-cookie';
import { useAuth } from '../useAuth';
import Design from '@/components/Design';
import { TeamScores } from '@/models/Team';
const coolNames = [
  'Cool Cat',
  'Funky Monkey',
  'Rockstar',
  'Score Wizard',
  'Top Gun',
  'Superstar',
  'Score King',
  'Awesome Achiever',
  'Score Champion',
  'Mega Maestro',
];

const ScoreboardPage = () => {
  useAuth();
  const router = useRouter();

  const [scores, setScores] = useState<TeamScores [] | null>(null); // Store the top 10 scores
  const [currentScore, setCurrentScore] = useState<number | null>(null); // Store the current user's score
  const [scoreboardLoaded, setScoreboardLoaded] = useState(false);

  const [cookies] = useCookies(['access_token']);
  const access_token = cookies.access_token;

  useEffect(() => {
    async function fetchScoreboard() {
      try {
        const response = await fetch(ENDPOINT + '/scoreboard/', {
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          const { top_10_scores, current_user_score } = data; // Extract scores 
          setScores(top_10_scores); // Set top 10 scores
          setCurrentScore(current_user_score); // Set the current user's score
          setScoreboardLoaded(true); // Mark scoreboard as loaded
        } else {
          console.error('Error fetching scoreboard:', response.status);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }
    fetchScoreboard();
  }, [router]);

  return (
    <main className={`${s.scoreboard} pd-top`}>
      <Design />
      <h1 className={s.title}>Live Scoreboard of Top Scorers</h1>
      <br />
      <hr className={s.hr} />
      <br /><br />
      {scoreboardLoaded ? (
        <div>
          <h1 className={s.userScore}>
            <span className={s.userScore_text}>Your Current Score is : {currentScore}</span>
          </h1><br />
          <table className={s.scoreTable}>
            <thead>
              <tr>
                <th>Position</th>
                <th>Cover Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody className={s.tablebody}>
              {scores?.map(({ team, score }, index) => (
                <tr key={index} className={s.scoreRow}>
                  <td>{index+1}</td>
                  <td>{team}</td>
                  <td>{score}</td>
                </tr>
              ))}
            </tbody>
          </table><br /><br />
        </div>
      ) : (
        <p className={s.loading}>Loading Scoreboard...</p>
      )}
    </main>
  );
};

export default ScoreboardPage;
