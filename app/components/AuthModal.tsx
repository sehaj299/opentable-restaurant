"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import AuthModalInputs from './AuthModalInputs';
import useAuth from '@/hooks/useAuth';
import { AuthenticationContext } from '../context/AuthContext';
import { Alert, CircularProgress } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
 
  boxShadow: 24,
  p: 4,
};

export default function LoginModal({isSignIn}:{isSignIn:boolean}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {signin,signup}=useAuth()
  const {loading,error,data}=React.useContext(AuthenticationContext)
   const renderContent=(signInContent:string,signUpContent:string)=>{
    return isSignIn?signInContent:signUpContent

  }
  const [inputs,setInputs]=useState({
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    city:"",
    password:"",


  })
  const [disabled,setDisabled]=useState(true)
 
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setInputs({
      ...inputs,
      [e.target.name]:e.target.value

    })

  }
  const handleClick=()=>{
    if(isSignIn){
      signin({email:inputs.email,password:inputs.password,handleClose})
    }
    else{
      signup({firstName:inputs.firstName,lastName:inputs.lastName,password:inputs.password,email:inputs.email,city:inputs.city,phone:inputs.phone,handleClose})
    }
  }
  return (
    <div>
      <button
            className={`${renderContent("bg-blue-400 text-white", "")}border p-1 px-4 rounded mr-3`}  onClick={handleOpen}
          >
           {renderContent("Sign in","Sign up")}
          </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading?<CircularProgress/>
          :
          <div className='p-2 h-[500px]'>
            {error?<Alert severity="error" className='mb-4'>{error}</Alert>:null}
            <div className='uppercase font-bold text-center pb-2 border-b mb-2'>
                <p className='text-sm'>
                  {renderContent("Sign In","Create Account")}  
                </p>
            </div>
            <div className='m-auto'>
              {data?data.firstName:null}
                <h2 className='text-2xl font-light text-center'>
                  
                    {renderContent("Log Into Your Account","Create Your OpenTable Account")}
                </h2>
            </div>
            <div>
            <AuthModalInputs inputs={inputs} handleChange={handleChange} isSignIn={isSignIn}/>
            <button   onClick={handleClick}className="uppercase bg-red-600 w-full  text-white p-3 rounded text-sm mb-5 disabled:bg-grey-400">{renderContent("sign In","create Account")}</button>
            </div>
          </div>}
        </Box>
      </Modal>
    </div>
  );
}