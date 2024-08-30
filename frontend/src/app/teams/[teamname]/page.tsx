'use client';

import React from 'react';
import { TeamDetailed } from '@/models/Team';
import s from './team.module.css';
import ENDPOINT from '@/helpers/endpoint';
import { useAuth } from '../../useAuth';
import Design from '@/components/Design';
import Cookies from 'js-cookie';

export default function TeamDetailPage( {
  params
}: {
  params: { teamname: string };
}) {
	
  const { teamname } = params;
  const decodedTeamname = decodeURIComponent(teamname); // Decode %20 to space
  const accessToken = Cookies.get('access_token');

  const [teamData, setTeamData] = React.useState<TeamDetailed[] | null>(null);

  const fetchTeamData = async () => {
    try {
      const response = await fetch(ENDPOINT + '/teams/', {
        // headers: {
        //   'Authorization': `Bearer ${accessToken}`,
        // },
      });
      if (response.ok) {
        const data = await response.json();
        setTeamData(data);
      } else {
        console.error('Failed to fetch team data');
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  // useAuth();
  try {
    fetchTeamData();
    const team = teamData?.find((t) => t.name === decodedTeamname);
    if (team) {
      return (
        <main className={s.team}>
          <h1>{team.name}</h1><hr className={s.hr} /><br /><br />
          <p>Member 1 : {team.member1}</p><br /><br />
          {team.member2 ? <p>Member 2 : {team.member2}</p> : null}<br /><br />
          {team.member3 ? <p>Member 3 : {team.member3}</p> : null}<br /><br />
        </main>
      );
    } else {
      return (
        <main className={s.team}>
          <p>Team not found.</p>
        </main>
      );
    }
  } catch (error) {
    // Handle errors (e.g., network error)
    return (
      <main className={s.team}>
        <Design />
        <p>Failed to fetch team data.</p>
      </main>
    );
  }
}