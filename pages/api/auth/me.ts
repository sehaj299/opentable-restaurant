import { NextApiRequest,NextApiResponse } from "next";
import * as jose from 'jose'
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient()
async function me(req:NextApiRequest,res:NextApiResponse) {
    const bearerToken=req.headers["authorization"] as string;
      const token=bearerToken.split(" ")[1]
  const payload=jwt.decode(token) as {email:string}
  if(!payload.email){
    return res.status(401).json("unauthorized")
  }
  const user=await prisma.user.findUnique({
    where:{
        email:payload.email
    },
    select:{
        id:true,
        first_name:true,
        last_name:true,
        email:true,
        phone:true,
        city:true,

    }
  })
  if(!user){
    return res.status(401).json({
      errorMessage:"user not found"
    })
  }
    return res.status(200).json({
        id:user.id,
        firstName:user.first_name,
        phone:user.phone,
        email:user.email,
        city:user.city
    })
} 


export default me