import AuthContext, { AuthenticationContext } from "@/app/context/AuthContext"
import axios from "axios"
import { useContext } from "react"
import {removeCookies} from "cookies-next"
const useAuth=()=>{
    const {loading,error,data,setAuthState}=useContext(AuthenticationContext)
    const signin=async({email,password,handleClose}:{email:string;password:string;handleClose:()=>void})=>{
        try {
            setAuthState({
                loading:true,
                error:null,
                data:null
            })
          const response=await axios.post("http://localhost:3000/api/auth/signIn",{
                email,
                password
            })
            console.log("right",response)
            setAuthState({
                loading:false,
                error:null,
                data:response.data
            })
            handleClose()
        } catch (error:any) {
            console.log("wrong",error)
            setAuthState({
                loading:false,
                error:error.response.data.errorMessage,
                data:null
            })
        }

    }
    const signup=async({firstName,lastName,password,email,city,phone,handleClose}:{firstName:string;lastName:string;password:string;email:string;city:string;phone:string;handleClose:()=>void})=>{
        try {
            setAuthState({
                loading:true,
                error:null,
                data:null
            })
            const response=await axios.post("http://localhost:3000/api/auth/signup",{
                firstName,
                lastName,
                password,
                email,
                city,
                phone
            })
            console.log("right",response)
            setAuthState({
                loading:false,
                error:null,
                data:response.data
            })
            handleClose()
        } catch (error:any) {
            console.log("wrong",error)
            setAuthState({
                loading:false,
                error:error.response.data.errorMessage,
                data:null
            })
        }

    }
    const signout=async()=>{
        removeCookies("jwt")
        setAuthState({
            loading:false,
            error:null,
            data:null
        })
    }
     return {
        signin,
        signup,
        signout
     }
}
export default useAuth