"use client"
import { useState, useEffect } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HiSelector } from "react-icons/hi";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import FootballScorecard from '@/components/shared/FootballScorecard';
import { io } from 'socket.io-client';
import CricketScorecard from '@/components/shared/CricketScorecard';
import { socket } from '@/lib/AuthSession';
import BasketballScorecard from '@/components/shared/BasketballScorecard';
import { toast } from 'react-hot-toast';


const page = () => {

    const [sportsType, setSportsType] = useState('');
    const [firstTeam, setFirstTeam] = useState('')
    const [secondTeam, setSecondTeam] = useState('')
    const [matchStarted, setMatchStarted] = useState(false)



    socket.on('matchStart', () => {
        console.log('match started');
    })

    return (
        <div className='flex flex-col items-center justify-center m-2 p-4'>
            {!matchStarted && <div className='flex flex-col justify-center items-center w-full bg-blue-100 
            py-8'>
                <div className='flex flex-col lg:flex-row w-full items-center justify-evenly'>
                    <div className='flex items-start justify-center flex-col rounded-xl p-4'>
                        <h2 className='text-3xl font-bold caption-top'>
                            Scoreboard
                        </h2>
                        <p>
                            Select the sports type for relevent scorecard
                        </p>
                    </div>
                    <div>

                        <Select onValueChange={(v) => setSportsType(v)}>
                            <SelectTrigger className=" w-64 bg-white  rounded-full px-12 py-6 shadow-lg font-semibold text-lg focus:outline-slate-100 inline-flex items-center gap-2">
                                <SelectValue placeholder="                      Select Sports" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cricket">Cricket</SelectItem>
                                <SelectItem value="football">Football</SelectItem>
                                <SelectItem value="basketball">basketball</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>
                </div>
                <Separator className="text-blue-800 my-3" />
                {sportsType !== '' && <div className='lg:w-fit flex flex-col items-center justify-center bg-white py-6 rounded-lg shadow px-4 w-[90%] lg:px-12'>
                    <h2 className='text-2xl font-bold mb-6 capitalize '>
                        {sportsType} Match
                    </h2>
                    <div className=' flex flex-col lg:flex-row w-full gap-8 items-center justify-evenly'>
                        <div className='flex flex-col justify-start items-start'>
                            <label htmlFor="first" className=' font-semibold text-sm  ml-1 mb-1'>First Team Name:</label>
                            <Input placeholder='teamname'
                                className="bg-slate-50 text-sm  rounded-lg" htmlFor="first" onChange={(v) => {
                                    setFirstTeam(v.target.value)
                                }}
                            />
                        </div>
                        <div className='flex flex-col justify-start items-start'>
                            <label htmlFor="second" className=' font-semibold text-sm  ml-1 mb-1'>Second Team Name:</label>
                            <Input placeholder='teamname' className="bg-slate-50 text-sm  rounded-lg" htmlFor="second" onChange={(v) => {
                                setSecondTeam(v.target.value)
                            }} />
                        </div>


                    </div>
                    {
                        firstTeam === '' || secondTeam === '' ? (
                            <Button disabled onClick={() => setMatchStarted(true)} className="mt-6 rounded-lg">Start Scorecard
                            </Button>
                        ) : (
                            <Button onClick={() => {
                                toast.success('match started')
                                socket.emit('matchStart',
                                    {
                                        sportsType,
                                        team1: firstTeam,
                                        team2: secondTeam
                                    })
                                setMatchStarted(true)
                            }} className="mt-6 rounded-lg">Start Scorecard
                            </Button>
                        )
                    }



                </div>}


            </div>}

            {
                matchStarted && sportsType === 'football' && (
                    <FootballScorecard sportsType={"football"} teamA={firstTeam} teamB={secondTeam} />
                )
            }
            {
                matchStarted && sportsType === 'basketball' && (
                    <FootballScorecard sportsType={"basketball"} teamA={firstTeam} teamB={secondTeam} />
                )
            }
            {
                matchStarted && sportsType === 'cricket' && (
                    <CricketScorecard teamA={firstTeam} teamB={secondTeam} />
                )
            }
            {/* <FootballScorecard teamA={firstTeam} teamB={secondTeam} /> */}
            {/* <BasketballScorecard teamA={firstTeam} teamB={secondTeam} /> */}
        </div>
    )
}

export default page
