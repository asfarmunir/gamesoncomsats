"use client"

import { useState, useEffect } from 'react'
import { CgMediaLive } from "react-icons/cg";
import { socket } from '@/lib/AuthSession';
import { useRouter } from 'next/navigation';

const LiveScore = ({ matchData }) => {

    const router = useRouter();

    const [isMatchStarted, setIsMatchStarted] = useState(true)
    const [isFinished, setIsFinished] = useState(false);
    const [winnigTeam, setwinnigTeam] = useState('')
    const [sportsType, setSportsType] = useState(matchData.sportsType)
    const [teamA, setTeamA] = useState(matchData.teamA)
    const [teamB, setTeamB] = useState(matchData.teamB)
    const [team1Goals, setTeam1Goals] = useState(matchData.teamAGoal)
    const [team2Goals, setTeam2Goals] = useState(matchData.teamBGoals || 0)
    const [teamAScore, setTeamAScore] = useState(matchData.teamAScoreData.score);
    const [teamAWickets, setTeamAWickets] = useState(matchData.teamAScoreData.wickets);
    const [teamBScore, setTeamBScore] = useState(matchData.teamBScoreData.score);
    const [teamBWickets, setTeamBWickets] = useState(matchData.teamBScoreData.wickets);
    const [overs, SetOvers] = useState(matchData.teamAScoreData.overs)
    useEffect(() => {
        socketInitializer();

        socket.on('footballScore', (goals) => {
            console.log('goals', goals);
            setTeam1Goals(goals.team1goals),
                setTeam2Goals(goals.team2goals)
        })
        socket.on('cricketScore', (teamData) => {
            console.log(teamData);
            setTeamAScore(teamData.team1.score);
            setTeamAWickets(teamData.team1.wickets);
            setTeamBScore(teamData.team2.score);
            setTeamBWickets(teamData.team2.wickets);
            SetOvers(teamData.team1.overs)
        })

        // return () => {
        //     console.log('Component unmounted. Disconnecting socket.');
        //     socket.disconnect();
        // };
    }, []);

    const socketInitializer = () => {

        // socket.on('matchStart', (teams) => {
        //     console.log('match started', teams);
        //     setSportsType(teams.sportsType)
        //     setTeamA(teams.team1)
        //     setTeamB(teams.team2)
        //     setIsMatchStarted(true)
        // })
        // socket.on('teams', (teams) => {
        //     console.log("emitted teams", teams);
        //     setTeamA(teams.team1)
        //     setTeamB(teams.team2)
        // })
        // socket.on('footballScore', (goals) => {
        //     console.log('useEffect goals', goals);
        // })

    }

    socket.on('matchFinish', (team) => {
        setIsFinished(true)
        setwinnigTeam(team)
        console.log(team);

    })


    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Month is zero-indexed, so add 1
    const day = today.getDate();

    return (
        <div className="flex items-center justify-evenly">
            {isMatchStarted ? (<div className="flex flex-col w-full items-center justify-center p-4 shadow-md border-2 m-2 bg-white md:m-6">
                <h2 className="text-2xl font-bold mt-3 text-primary capitalize">
                    Live Scorecard
                </h2>
                <div className='flex flex-col items-start justify-center shadow-md my-6 bg-blue-50 p-4 w-full rounded-md '>
                    <div className='flex mb-1 items-center justify-center '>
                        <h2 className='mx-3 mt-2 text-xl md:text-2xl font-bold text-primary-500 capitalize'>
                            {sportsType}  Match
                        </h2>
                        <p className=' inline-flex px-6 rounded-full gap-2 py-0.5 items-center text-sm text-red-600 bg-red-100'>
                            <CgMediaLive />

                            Live
                        </p>
                    </div>
                    <p className=' mb-4 mx-3 text-sm border-b w-full text-start pb-3 font-light text-slate-500'>
                        {day}-{month}-{year}
                    </p>

                    {
                        sportsType === 'cricket' ? (
                            <div className='text-lg mt-6 flex flex-col md:flex-row items-center justify-evenly w-full font-semibold mb-6'>
                                <div className='flex flex-col gap-3
                 items-center justify-center'>
                                    <h2 className='text-2xl font-bold text-primary'>{teamA} Score</h2>
                                    <p className='text-lg text-slate-700'>
                                        {teamAScore} / {teamAWickets}
                                        {/* 2 / 2 */}
                                    </p>

                                </div>
                                <div className='flex items-center justify-center gap-2 flex-col'>
                                    <p className='text-lg font-bold text-black'>Overs</p>
                                    <span className='text-sm font-semibold text-slate-600'>{overs}</span>
                                </div>
                                <div className='flex flex-col gap-3
                 items-center justify-center'>
                                    <h2 className='text-2xl font-bold text-primary'>{teamB} Score</h2>
                                    <p className='text-lg text-slate-700'>
                                        {teamBScore} / {teamBWickets}
                                        {/* 2 / 2 */}

                                    </p>

                                </div>
                            </div>
                        ) : (
                            <div className=' my-6 rounded-md p-3 flex items-center justify-evenly gap-4  w-full'>
                                <div>
                                    <h2 className='font-semibold text-lg md:text-2xl text-primary capitalize'>
                                        {teamA}
                                    </h2>
                                </div>
                                <div className='flex items-center justify-center gap-1 md:gap-3'>
                                    <span className=' text-xl md:text-3xl font-bold text-primary'>
                                        {team1Goals}
                                    </span>
                                    <span className=' text-2xl font-bold'>

                                        -
                                    </span>
                                    <span className=' text-xl md:text-3xl font-bold text-primary'>
                                        {team2Goals}
                                    </span>

                                </div>
                                <div>
                                    <h2 className='font-semibold text-lg md:text-2xl text-primary capitalize'>
                                        {teamB}
                                    </h2>
                                </div>
                            </div>
                        )
                    }

                    {
                        isFinished ? (

                            winnigTeam === 'tied' ? (
                                <p className=' w-full text-center italic text-sm font-thin text-slate-500 mb-5'>
                                    Match Tied
                                </p>
                            ) : (
                                <p className=' w-full text-center italic text-sm font-thin text-slate-500 mb-5'>
                                    <span className='font-bold text-lg capitalize mr-1 text-primary-500'> {winnigTeam}</span>     won the match
                                </p>
                            )


                        ) : (
                            <p className=' w-full text-center text-sm font-thin text-slate-500 mb-5'>score is being managed by the umpires in realtime</p>
                        )
                    }

                </div>

            </div>) : (
                <p>hehe</p>
            )}
        </div>
    )
}

export default LiveScore
