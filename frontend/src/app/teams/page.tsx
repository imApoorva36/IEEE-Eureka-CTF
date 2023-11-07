'use client'
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { TeamBrief } from '@/models/Team';
import s from './teams.module.css';
import ENDPOINT from '@/helpers/endpoint';
import Cookies from 'js-cookie';
import { useAuth } from '../useAuth';

export default function Teams() {
  const [teamData, setTeamData] = useState([{}]);
  const [searchInput, setSearchInput] = useState('');
  const [sortDirection, setSortDirection] = useState(1); // 1 for ascending, -1 for descending
  const sortColumnRef = useRef(null);
  const accessToken = Cookies.get('access_token');
  // useAuth();
  const inputRef = useRef(null);
  useEffect(() => {
    async function fetchTeamData() {
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
      } catch (err) {
        console.error(err);
      }
    }

    fetchTeamData();
  }, [accessToken]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSort = (columnName) => {
    if (sortColumnRef.current === columnName) {
      setSortDirection(sortDirection * -1);
    } else {
      sortColumnRef.current = columnName;
      setSortDirection(1);
    }
  };

  const sortedTeams = [...teamData].sort((a, b) => {
    if (sortColumnRef.current === 'name') {
      return sortDirection * a.name.localeCompare(b.name);
    }
  });

  const filteredTeams = sortedTeams.filter((team) =>
    team.name && team.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <main className={s.teams}>
      <div className={s.header}>
        <h1>Explore Registered Teams</h1>
        <br />
        <hr className={s.hr} />
        <br />
        <input
          type="text"
          placeholder="Search for a team..."
          className={s.searchInput}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          ref={inputRef}
        />
      </div><br />
      <table className={s.teamList}>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Team Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredTeams.map((team, index) => (
            <tr key={index} className={s.teamItem}>
              <td>
                <Link href={`/teams/${team.name}`} className={s.teamLink}>
                  {team.name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
