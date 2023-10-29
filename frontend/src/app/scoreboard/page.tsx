'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import ENDPOINT from '@/helpers/endpoint';
import Scoreboard from '@/models/Scoreboard';
import s from './scoreboard.module.css';
import { useCookies } from 'react-cookie'; // Import the useCookies hook
import { useAuth } from '../useAuth'; // Import the useAuth hook

const ScoreboardPage = () => {
  useAuth();
  const router = useRouter();
  const [scores, setScores] = useState([]);
  const [scoreboard, setScoreboard] = useState<Scoreboard | null>(null);
  const [scoreboardLoaded, setScoreboardLoaded] = useState(false);

  const [cookies] = useCookies(['access_token']);
  const access_token = cookies.access_token;

  useEffect(() => {
    async function fetchScoreboard() {
      try {
        // console.log("The access token", access_token);
        const axiosConfig = {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
        };
        const response = await fetch(`${ENDPOINT}/scoreboard/`);
        if (response.ok) {
          const data = await response.json();
          setScores(data);

          // Initialize the scoreboard here
          const newScoreboard = new Scoreboard(data);
          setScoreboard(newScoreboard);
        } else {
          // Handle errors here, e.g., redirect or display an error message
          console.error('Error fetching scoreboard:', response.status);
        }
      } catch (error) {
        // Handle network errors here
        console.error('Network error:', error);
      }
    }

    
  }, [router]);

  if (!scoreboard) {
    return null;
  }

  return (
    <main className={`${s.scoreboard} pd-top`}>
      <h1>Scoreboard</h1>
      <br />
	  <hr />
	  <p>Yayy, Welcome to ScoreBoard!!</p><h1>YAYYY!!</h1>
      {/* <h2>Your score: {scoreboard.me}</h2> */}
      <br /><br />
      {/* <ul>
        {scoreboard.leaderboard.map((pos, index) => (
          <li key={index}>{pos.position}. {pos.nickname} - {pos.score}</li>
        ))}
      </ul> */}
    </main>
  );
};

export default ScoreboardPage;
