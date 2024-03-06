import AddEquiment from '@/components/shared/AddEquiment'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getEquipments } from '@/lib/database/actions/equipment.actions'
import React from 'react'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import BookEquipment from '@/components/shared/BookEquipment'
import Link from 'next/link'


const page = async () => {
  const equipments = await getEquipments();
  const session = await getServerSession(authOptions)
  if(!session)
  {
    redirect('/')
  }
  const userId = session.user.id.toString();
  return (
    <div className='wrapper flex flex-col items-start justify-start w-full h-full  overscroll-y-scroll '>
    
    {
      session.user && session.user.role === "admin" && 
      <AddEquiment />
    }

      <h2 className='font-bold text-3xl capitalize text-primary self-center mb-6 pb-2 px-4  shadow '>
        Sports Equipments
      </h2>
       {
          equipments.length === 0 && (<p className=' flex items-center justify-center w-full pb-5 text-primary font-semibold '>No Equipment Added</p>)
        }
      <div className=' grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6 '>
        {
          equipments.map((item) => (  
          <div key={item._id} className='flex flex-col items-center justify-center bg-white   shadow-lg p-4 rounded-md mb-8'>
          <h3 className='text-xl font-semibold capitalize'>
            {item.name}
          </h3>
          <Separator className='my-3' />
          <div className='flex items-center justify-around gap-4'>
            <div className='flex flex-col gap-1 '>
              <p className='font-light text-sm'>
                Total Qty: <span className='font-semibold text-primary'>{item.totalQuantity}</span>
              </p>
              <p className='font-light text-sm'>
                Available Qty: <span className='font-semibold text-primary'>{item.availableQuantity}</span>
              </p>
            </div>

            <div className='text-center'>
              <p className='text-sm'>Sports Type</p>
              <span className='font-bold text-primary capitalize'>{item.sportsType}</span>
            </div>
           
          </div>
          {
            session.user.role === "admin" ? (
          <Link href={`/inventory/${item._id}`} className="mt-4 bg-primary px-4 py-2 text-sm rounded-md text-white" varient="sm">Check Bookings</Link>
            ) : (
            <BookEquipment bookerId={userId} itemId={item._id} />
            )
          }
        </div>))
        }
      
      </div>
    </div>
  )
}

export default page
