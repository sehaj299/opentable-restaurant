import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import {times} from '../../../../app/data/time'
import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient()
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const{slug,date,time,partySize}=req.query 
    console.log("query",req.query)
    if(!date||!time||!partySize){
        return res.json({
            success:true,
          message: " enter valid inputs"
        })
    }
    const searchTime= times.find(t=> t.time===time
    )?.searchTimes
    if(!searchTime){
        return res.json({
            success:true,
          message: " no search time"
        })
    }console.log("date",`${date}T${searchTime[0]}`)
    const bookings= await prisma.booking.findMany({
        where:{
           booking_time :{
            gte:new Date(`${date}T${searchTime[0]}`),
            lte:new Date(`${date}T${searchTime[-1]}`)
           }
        },
    })
    return res.json({ searchTime})
} 
//http://localhost:3000/api/Restaurant/ramakrishna-indian-restaurant-ottawa/availability?date=20-01-01&time=00:30:00.000Z&partSize=4