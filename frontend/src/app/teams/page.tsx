'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TeamBrief } from '@/models/Team'
import s from './teams.module.css'
import ENDPOINT from '@/helpers/endpoint';
import Cookies from 'js-cookie';

export default function Teams() {
  const [teamData, setTeamData] = useState([{}]);
  const accessToken = Cookies.get('access_token');

  useEffect(() => {
    async function fetchTeamData() {
      try {
        const response = await fetch(ENDPOINT + '/teams/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTeamData(data); // Set the team data from the API response
		  console.log(teamData);
		  console.log(data);
        } else {
          console.error('Failed to fetch team data');
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchTeamData();
  }, [accessToken]);

  return (
    <main className={s.teams}>
      <h1>Teams</h1>
      <ul>
        {teamData.map((team, index) => (
          <li key={index}>
            <Link href={`/teams/${team.name}`}>
              {team.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
