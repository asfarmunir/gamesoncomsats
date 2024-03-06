import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getGroundtBookingDetails } from '@/lib/database/actions/ground.actions';
import { Button } from '@/components/ui/button';

const page = async ({ params: { id } }) => {
  const groundData = await getGroundtBookingDetails(id);
  console.log(groundData);

  const formatTime = (time) => {
    const hour = parseInt(time.split(':')[0]);
    const minute = time.split(':')[1];
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour;
    return `${formattedHour}:${minute}:00 ${suffix}`;
  };

  return (
    <div>
      <Table>
        <TableCaption className="mb-6">Time Slots</TableCaption>
        <TableHeader>
          <TableRow className="bg-slate-100">
            <TableHead className="w-[140px] text-center font-bold">Slot Number</TableHead>
            <TableHead className="text-center  font-bold" >Timings</TableHead>
            <TableHead className="text-center font-bold">Status</TableHead>
            <TableHead className="text-center font-bold">Booking</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groundData.timeSchedule.map((slot, index) => (
            <TableRow key={slot.slotNumber}>
              <TableCell className="font-medium text-center">{slot.slotNumber}</TableCell>
              <TableCell className="text-center">{formatTime(slot.timings)}</TableCell>
              <TableCell className={`text-center ${slot.status === 'Available' ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"}  `}>{slot.status}</TableCell>
              <TableCell className="text-center">
                {
                  slot.status === 'Available' ? (<Button className="py-0 px-6 text-sm">book</Button>
                  ) : (<Button className="py-0 px-6 text-sm" disabled>book</Button>)
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
