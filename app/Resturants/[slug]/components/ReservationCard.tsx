'use client';
import { useState } from 'react';
import {partySize,times} from '../../../data/index'
import DatePicker from 'react-datepicker';
function ReservationCard({
  openTime,closeTime
}:{openTime:String;closeTime:String}) {

  const[selectedDate,setSelectedDate]=useState<Date | null>(new Date())
  const handleChangeDate=(date:Date|null)=>{
    if(date){
      return setSelectedDate(date)
    }
  }
 function restaurantTimes(){
  let restaurantTimesArray:typeof times =[]
  let isTimeWithinRestaurant=false;
  times.forEach((time)=>{
    if(time.time===openTime){
      isTimeWithinRestaurant=true
    }
    if( isTimeWithinRestaurant){
      restaurantTimesArray.push(time)
    }
    if(time.time===closeTime){
      isTimeWithinRestaurant=false
    }
  })
 return restaurantTimesArray
 }
  return (
    <div> <div className="w-[27%] relative text-reg">
    <div className="fixed w-[25%] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className=" flex flex-col">
        <label htmlFor="">Party size</label>
        <select name="" className="py-3 border-b font-light" id="">
          {partySize.map((size)=>
            <option value={size.value}>{size.label}</option>
          )}
          
         
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
         <DatePicker selected={selectedDate}onChange={handleChangeDate} className='py-3 border-b font-light text-reg w-28' dateFormat='MMMM d' wrapperClassName='w-[48%]' />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select name="" id="" className="py-3 border-b font-light">
            {restaurantTimes().map((time)=>
            <option value={time.time}>{time.displayTime}</option>
            )}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button
          className="bg-red-600 rounded w-full px-4 text-white font-bold h-9"
        >
          Find a Time
        </button>
      </div>
    </div>
  </div></div>
  )
}

export default ReservationCard