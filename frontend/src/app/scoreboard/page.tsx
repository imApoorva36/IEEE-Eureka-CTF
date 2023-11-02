'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ENDPOINT from '@/helpers/endpoint';
import s from './scoreboard.module.css';
import { useCookies } from 'react-cookie';
import { useAuth } from '../useAuth';

const ScoreboardPage = () => {
  useAuth();
  const router = useRouter();
  const [scores, setScores] = useState<number[]>([]); // Store scores as an array of numbers
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
      <h1>Scoreboard</h1>
      <br />
      <hr />
      <br /><br />
      {scoreboardLoaded ? (
        <div>
          <h1>Your Score Right now is : {currentScore}</h1> {/* Display the current user's score */}
          <table className={s.scoreTable}>
            <thead>
              <tr>
                <th>Position</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody className={s.tablebody}>
              {scores.map((score, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading scoreboard...</p>
      )}
    </main>
  );
};

export default ScoreboardPage;
