"use client"

import axios from 'axios';
import { cookies } from 'next/dist/client/components/headers';
import {getCookie} from "cookies-next"
import { getCookieParser } from 'next/dist/server/api-utils';
import React, { useState,createContext, useEffect } from 'react'
interface user{
    id:number;
    firstName:string;
    lastName:string;
    phone:string;
    city:string;
    email:string;
}
interface state{
    loading:boolean,
    error:string|null;
    data:user|null;
}
interface AuthState extends state{
    setAuthState: React.Dispatch<React.SetStateAction<state>>
}
export const AuthenticationContext=createContext<AuthState>({
    loading:false,
    error:null,
    data:null,
    setAuthState:()=>{}

})
function AuthContext({children}:{children:React.ReactNode}) {
    const [authState,setAuthState]=useState<state>(
        {
        loading:true,
        data:null,
        error:null
    })
const fetchUser=async()=>{
    
    try {
        setAuthState({
            loading:true,
            data:null,
            error:null
        })
        const jwt=getCookie("jwt")
        console.log(jwt)
        
        if(!jwt){
            return setAuthState({
                loading:false,
                data:null,
                error:null
            })
        }

        const response=await axios.get("http://localhost:3000/api/auth/me",{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        })
        axios.defaults.headers.common["Authorization"]=`Bearer ${jwt}`
        setAuthState({
            data:response.data,
            error:null,
            loading:false,
        })
    } catch (error:any) {
        setAuthState({
            data:null,
            error:error.response.data.error,
            loading:false,
        })
        
    }

}
 useEffect(()=>{
    fetchUser();
 },[])
    return (
    <AuthenticationContext.Provider value={{
        ... authState,
        setAuthState
    }
       

    }>{children}</AuthenticationContext.Provider>
  )
}

export default AuthContext