"use client";

import ENDPOINT from "@/helpers/endpoint";
import s from "./questions.module.css";
import { useEffect, useState } from "react";
import Question from "@/models/Question";
import QuestionsGrid from "./_components/QuestionsGrid";
import { useCookies } from "react-cookie";
import { useAuth } from "../useAuth";

export default function Questions() {
	useAuth();

	const dummyData: Question[] = [
		{
			id: "1",
			title: "Rescue Princess Peach!",
			text: "Bowser has hidden Princess Peach in a castle far away. Use your reverse engineering skills to crack the code and unlock the castle gates. Can you decode Bowser's encryption before time runs out?",
			points: 10,
			link: "https://example.com/question1",
			is_answered: false,
			user_response_count: 3,
		},
		{
			id: "2",
			title: "Luigi's Haunted Mansion Mystery",
			text: "Help Luigi escape from the haunted mansion by analyzing suspicious network traffic patterns. Look closely to find hidden messages left by ghosts! Solve the puzzle to help Luigi find the way out.",
			points: 20,
			link: "https://example.com/question2",
			is_answered: true,
			user_response_count: 5,
		},
		{
			id: "3",
			title: "Koopa Troopa’s Data Leak",
			text: "It seems that a Koopa Troopa has accidentally leaked sensitive data. Use your SQL injection skills to uncover hidden flags in Bowser’s server without getting detected. Keep your movements stealthy!",
			points: 30,
			link: "https://example.com/question3",
			is_answered: false,
			user_response_count: 2,
		},
		{
			id: "4",
			title: "Yoshi's Binary Bonanza",
			text: "Yoshi needs help sorting through a sea of binary code to find a secret message. The code holds hints to the whereabouts of Mario's next power-up! Decipher the code to gain an advantage in the game.",
			points: 40,
			link: "https://example.com/question4",
			is_answered: true,
			user_response_count: 6,
		},
		{
			id: "5",
			title: "Toad’s Secure Shell Showdown",
			text: "Toad has discovered a hidden SSH server in Bowser’s fortress. Break into the server and retrieve the hidden flag, but beware of the traps Bowser has set to lock you out!",
			points: 50,
			link: "https://example.com/question5",
			is_answered: false,
			user_response_count: 3,
		},
		{
			id: "6",
			title: "Mario Kart Network Analysis",
			text: "Use network analysis skills to uncover which racer is leaking confidential Mario Kart strategies! Capture and analyze the packets to reveal the racer who’s sabotaging Mario’s plans.",
			points: 60,
			link: "https://example.com/question6",
			is_answered: true,
			user_response_count: 7,
		},
		{
			id: "7",
			title: "Bowser's Brute Force Challenge",
			text: "Bowser has locked down a vital power-up behind a password-protected vault. Use brute force techniques to break open the vault and secure the power-up for Mario before Bowser notices!",
			points: 70,
			link: "https://example.com/question7",
			is_answered: false,
			user_response_count: 4,
		},
		{
			id: "8",
			title: "The Legend of the Fire Flower",
			text: "Legends say the Fire Flower lies hidden in a forgotten database. Dive into SQL and perform careful queries to uncover its location. Only those with keen database skills can retrieve it!",
			points: 80,
			link: "https://example.com/question8",
			is_answered: true,
			user_response_count: 9,
		},
		{
			id: "9",
			title: "Shy Guy's Encrypted Hideout",
			text: "Shy Guy has hidden an important flag in an encrypted hideout. Use your cryptography skills to decrypt the location and retrieve the flag without alerting Shy Guy to your presence!",
			points: 90,
			link: "https://example.com/question9",
			is_answered: false,
			user_response_count: 5,
		},
		{
			id: "10",
			title: "Bowser's Final Firewall",
			text: "The last and toughest challenge awaits! Bowser has set up a heavily guarded firewall. Find vulnerabilities, breach the defenses, and seize the ultimate flag to win the competition!",
			points: 100,
			link: "https://example.com/question10",
			is_answered: true,
			user_response_count: 10,
		},
	];

	const [cookies] = useCookies(["access_token"]);
	const [questions, setQuestions] = useState<Question[]>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const access_token = cookies.access_token;
				const res = await fetch(`${ENDPOINT}/questions/`, {
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
					next: { revalidate: 0 },
				});


				if (res.status === 402) {
					throw new Error("402");
				}

				const data = await res.json();
				setQuestions(data);
			} catch (err) {
				console.log(err);
			}
		};

		fetchData();
	}, [cookies.access_token]);

	const filterQuestionsByDifficulty = (
		minPoints: number,
		maxPoints: number
	) => {
		return questions.filter(
			(q) => q.points >= minPoints && q.points <= maxPoints
		);
	};

	return (
		<main className={`${s.questions} pd-top`}>
			<h1 className={s.heading}>Questions</h1>
			<h2 className={s.subheading}>Easy</h2>
			<QuestionsGrid questions={filterQuestionsByDifficulty(0, 35)} />
			<h2 className={s.subheading}>Medium</h2>
			<QuestionsGrid questions={filterQuestionsByDifficulty(36, 64)} />
			<h2 className={s.subheading}>Hard</h2>
			<QuestionsGrid questions={filterQuestionsByDifficulty(65, Infinity)} />
		</main>
	);
}
