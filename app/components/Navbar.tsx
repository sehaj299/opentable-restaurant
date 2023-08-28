"use client"
import Link from 'next/link'
import React from 'react'
import AuthModal from './AuthModal'
import { AuthenticationContext } from '../context/AuthContext'
import useAuth from '@/hooks/useAuth'

function Navbar() {
  const{signout}=useAuth()
  const{data,error,loading}=React.useContext(AuthenticationContext)
  return (
    <div><nav className="bg-white p-2 flex justify-between">
    <Link href="/" className="font-bold text-gray-700 text-2xl">
          OpenTable{" "}
        </Link>
      {loading?null:<div>
        {data?<button className="rounded bg-red-600 text-white border p-1 px-4 rounded mr-3" onClick={signout}>SignOut</button>:<div className="flex">
          
          < AuthModal isSignIn={true}/>
          < AuthModal isSignIn={false}/>
          
        </div>}
      </div>}
    </nav></div>
  )
}

export default Navbar