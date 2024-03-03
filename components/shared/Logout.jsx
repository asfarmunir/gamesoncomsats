"use client"
import React from 'react'
import { LuLogOut } from 'react-icons/lu'
import { signOut } from 'next-auth/react'
import { toast } from 'react-hot-toast' 

const Logout = () => {

    const logoutUser = async () => {
    await signOut();
}
  return (
   <LuLogOut className=" hover:cursor-pointer" onClick={logoutUser} />

  )
}

export default Logout
