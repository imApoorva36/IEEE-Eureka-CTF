'use client';
import { TeamDetailed } from '@/models/Team';
import s from './team.module.css';
import ENDPOINT from '@/helpers/endpoint';
import { useAuth } from '../../useAuth';
import Cookies from 'js-cookie';

export default async function TeamDetailPage( {
  params
}: {
  params: { teamname: string };
}) {
	
  const { teamname } = params;
  const decodedTeamname = decodeURIComponent(teamname); // Decode %20 to space
  const accessToken = Cookies.get('access_token');
  // useAuth();
  try {
    const teams: TeamDetailed[] = await fetch(ENDPOINT + '/teams/', {
      // headers: {
      //   'Authorization': `Bearer ${accessToken}`,
      // },
    }).then((res) => res.json());
    const team = teams.find((t) => t.name === decodedTeamname);
    if (team) {
      return (
        <main className={s.team}>
          <h1>{team.name}</h1><hr className={s.hr} /><br /><br />
          <p>Member 1 : {team.member1}</p><br /><br />
          <p>Member 2 : {team.member2}</p><br /><br />
          <p>Member 3 : {team.member3}</p><br /><br /> 
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
        <p>Failed to fetch team data.</p>
      </main>
    );
  }
}