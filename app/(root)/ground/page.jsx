import AddGround from '@/components/shared/AddGround'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getgrounds } from '@/lib/database/actions/equipment.actions'
import React from 'react'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getGrounds } from '@/lib/database/actions/ground.actions'


const page = async () => {


  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/')
  }
  const grounds = await getGrounds();

  return (
    <div className='wrapper flex flex-col items-start justify-start w-full h-full  overscroll-y-scroll '>

      {
        session.user && session.user.role === "admin" &&
        <AddGround />
      }

      <h2 className='font-bold text-3xl capitalize text-primary self-center mb-6 pb-2 px-4  shadow '>
        Sports grounds
      </h2>
      {
        grounds.length && grounds.length === 0 && (<p className=' flex items-center justify-center w-full pb-5 text-primary font-semibold '>No Playgrounds Added</p>)
      }
      <div className=' grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6 '>
        {
          grounds.length && grounds.map((ground) => {
            let availableSlots = 0;
            let bookedSlots = 0;

            // Count available and booked slots
            ground.timeSchedule.forEach((slot) => {
              if (slot.status === 'Available') {
                availableSlots++;
              } else {
                bookedSlots++;
              }
            });
            return (
              <div key={ground._id} className='flex flex-col items-center justify-center bg-white   shadow-lg p-4 rounded-2xl mb-8'>
                <h3 className='text-xl font-semibold capitalize'>
                  {ground.name}
                </h3>
                <span className='font-bold text-sm text-primary  capitalize'>{ground.sportsType}</span>
                <Separator className='my-3' />
                <div className='flex items-center justify-around gap-4'>
                  <div className='flex flex-col gap-1 '>
                    <p className='font-light text-sm'>
                      Booking Time: <span className='font-semibold text-primary'>{ground.timeAllowed} hour</span>
                    </p>
                    <p className='font-light text-sm'>

                      Available Slots: <span className='font-semibold text-primary'>{availableSlots} slots</span>
                    </p>
                    <p className='font-light text-sm'>

                      Booked Slots: <span className='font-semibold text-primary'>{bookedSlots} slots</span>
                    </p>
                  </div>



                </div>

                <Link href={`/ground/${ground._id}`} className="mt-4 bg-primary px-4 py-2 text-sm rounded-md text-white" varient="sm">
                  {
                    session.user.role === 'admin' ? 'Check Bookings' : 'Book slot'
                  }
                </Link>
              </div>)
          })
        }

      </div>

    </div>
  )
}

export default page
