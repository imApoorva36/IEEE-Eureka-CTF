// Import necessary dependencies and modules
'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Change from 'next/navigation' to 'next/router'
import ENDPOINT from '@/helpers/endpoint';
import Scoreboard from '@/models/Scoreboard';
import s from './scoreboard.module.css';
import useAuth from './useAuth'; // Adjust the path as needed

const ScoreboardPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [scores, setScores] = useState([]);
  const [scoreboard, setScoreboard] = useState<Scoreboard | null>(null); // Initialize scoreboard state with null
  const [scoreboardLoaded, setScoreboardLoaded] = useState(false); // Initialize scoreboardLoaded state

//   const [scoreboard, setScoreboard] = useState(null); // Initialize scoreboard state

  useEffect(() => {
    async function fetchScoreboard() {
      try {
        const response = await fetch(`${ENDPOINT}/scoreboard/`, {
          headers: {
            // Add headers if needed for authentication
            // e.g., 'Authorization': `Bearer ${user.token}`,
          },
        });

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

    if (!user) {
      // User is not authenticated, redirect to the login page
      router.push('/login'); // Adjust the path to your login page
    } else {
      // User is authenticated, fetch scoreboard data
      fetchScoreboard();
    }
  }, [user, router]);

  if (!scoreboard) {
    // You may want to show a loading indicator or handle this case differently
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
