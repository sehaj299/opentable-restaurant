import { NextApiRequest, NextApiResponse} from "next"
import validator from 'validator'
import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient()
import bcrypt from 'bcrypt'
import * as jose from 'jose'
import { setCookie } from "cookies-next";
async function signup(req:NextApiRequest,res:NextApiResponse) {
    
    
    
    if(req.method === 'POST'){
        const{firstName,lastName,phone,city,password,email}=req.body;
        const errors:string[]=[];
       
        const validationSchema=[
            {
            valid: validator.isLength(firstName,{
                min:1,
                max:20,
            }),
            errorMessage:"firstName is Invalid"
        },
        {
            valid: validator.isLength(lastName, {
                min:1,
                max:20,
            }),
            errorMessage:"lastName is Invalid"
        },
        {
            valid: validator.isEmail(email),
            errorMessage:"email is Invalid"
        },
        {
            valid: validator.isMobilePhone(phone),
            errorMessage:"phone number is Invalid"
        },
        {
            valid: validator.isLength(city,{
                min:1,
                max:20,
            }),
            errorMessage:"city is Invalid"
        },
        {
            valid: validator.isStrongPassword(password),
            errorMessage:"password is not strong"
        }
    ]
    validationSchema.forEach((check)=>{
        if(!check.valid){
            errors.push(check.errorMessage)

        }
    })
    const userWithEmail=await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(errors.length){
        return res.status(400).json({
            errorMessage:errors[0]
        })
    }
    if(userWithEmail){
        return res.status(400).json({
            errorMessage:"email is linked with another account"
        })
    }
    const hashPassword=await bcrypt.hash(password,10)
    const user=await prisma.user.create({
        data:{
            first_name:firstName,
            last_name:lastName,
            password:hashPassword,
            phone,
            city,
            email
        }

    })
    const alg="HS256"
    const secret=new TextEncoder().encode(process.env.JWT_SECRET)
    const token=await new jose.SignJWT({email:user.email})
    .setProtectedHeader({alg})
    .setExpirationTime("24h")
    .sign(secret)
    setCookie("jwt",token,{req,res,maxAge:60*6*24})
    return res.status(200).json({
        firstName:user.first_name,
        lastName:user.last_name,
        email:user.email,
        phone:user.phone,
        city:user.city
      })

    }
 
}

export default signup