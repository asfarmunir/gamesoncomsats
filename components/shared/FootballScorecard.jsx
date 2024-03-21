"use client"
import { useEffect, useState } from 'react'
import { Separator } from '../ui/separator'
import { IoMdAdd } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Button } from '../ui/button';
import { socket } from '@/lib/AuthSession';


const FootballScorecard = ({ sportsType, teamA, teamB }) => {

    const [team1Goals, setTeam1Goals] = useState(0)
    const [team2Goals, setTeam2Goals] = useState(0)

    // let socket = io("http://localhost:5000");

    // let teams = {
    //     team1: teamA,
    //     team2: teamB
    // }
    // useEffect(() => {
    //     socketInitializer();
    //     // return () => {
    //     //     socket.disconnect();
    //     // };
    // }, []);

    // const socketInitializer = () => {

    //     // socket.emit("teams", teams);
    //     socket.on("connected", () => setSocketConnected(true));
    //     console.log(socketConnected);
    //     socket.on('teams', (teams) => {
    //         console.log("emitted teams", teams);
    //     })

    // }

    // function handleSubmit(e) {
    //     e.preventDefault();

    //     console.log("emitted");
    //     console.log(score);

    //     socket.emit('scoring', score)

    // }
    // console.log(socketConnected);

    // date
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Month is zero-indexed, so add 1
    const day = today.getDate();


    return (
        <div className='bg-white w-full p-4 m-3 rounded-lg flex flex-col items-center justify-center'>
            <h2 className='text-3xl font-bold capitalize  mb-1'>
                {sportsType} Match
            </h2>
            <p className=' mb-4 font-light text-slate-500'>
                {day}/{month}/{year}
            </p>
            <Separator className='w-[80%] text-slate-400' />
            <h2 className='text-4xl font-bold my-4 '>
                {
                    team1Goals
                } - {
                    team2Goals
                }
            </h2>
            <div className='flex flex-row items-center w-full justify-evenly mt-4'>
                <div className='flex flex-col items-center justify-center'>

                    <h2 className='text-lg md:text-2xl font-semibold capitalize text-primary'>
                        {teamA}
                    </h2>
                    <div className='flex text-sm md:text-lg items-center justify-center gap-4 mt-4'>
                        <button className=' bg-slate-100/80 hover:bg-slate-200/70 p-1' onClick={() => {

                            setTeam1Goals(team1Goals - 1)
                            socket.emit('footballScore', {
                                'team1goals': team1Goals - 1,
                                'team2goals': team2Goals,
                            })

                        }} disabled={team1Goals === 0}><FaMinus /></button>
                        <span>{team1Goals}</span>
                        <button className=' bg-slate-100/80 hover:bg-slate-200/70 p-1' onClick={() => {

                            setTeam1Goals(team1Goals + 1)
                            let goals = {
                                'team1goals': team1Goals + 1,
                                'team2goals': team2Goals,
                            }
                            socket.emit('footballScore', goals)
                        }} disabled={team1Goals === 10}><FaPlus /></button>
                    </div>
                    <p className='text-xs font-thin text-slate-500 mt-3'>
                        {
                            sportsType === 'basketball' ? ('points for teams') : (' goals for team')
                        }                    </p>
                </div>
                <div className='flex flex-col items-center justify-center'>

                    <h2 className='text-lg md:text-2xl font-semibold capitalize text-primary'>
                        {teamB}
                    </h2>
                    <div className='flex text-sm md:text-lg items-center justify-center gap-4 mt-4'>
                        <button className=' bg-slate-100/80 hover:bg-slate-200/70 p-1'

                            onClick={() => {

                                setTeam2Goals(team2Goals - 1)
                                socket.emit('footballScore', {
                                    'team1goals': team1Goals,
                                    'team2goals': team2Goals - 1,
                                })

                            }}
                            disabled={team2Goals === 0}><FaMinus /></button>
                        <span>{team2Goals}</span>
                        <button className=' bg-slate-100/80 hover:bg-slate-200/70 p-1'

                            onClick={() => {

                                setTeam2Goals(team2Goals + 1)
                                socket.emit('footballScore', {
                                    'team1goals': team1Goals,
                                    'team2goals': team2Goals + 1,
                                })

                            }}

                            disabled={team2Goals === 10}><FaPlus /></button>
                    </div>
                    <p className='text-xs font-thin text-slate-500 mt-3'>
                        {
                            sportsType === 'basketball' ? ('points for teams') : (' goals for team')
                        }

                    </p>
                </div>
            </div>
            <Button className='mt-6 mb-4 px-4 rounded-full'>Save Results</Button>
        </div>
    )
}

export default FootballScorecard
