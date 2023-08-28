
interface props{
  inputs:{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
  },
  handleChange:(e:React.ChangeEvent<HTMLInputElement>)=>void,
  isSignIn:boolean
 
}
function AuthModalInputs({inputs,handleChange,isSignIn}:props) {
  return (
    <div>
    {isSignIn?null:<div className='my-3 flex justify-between text-sm'>
    
    <input type='text'
      className=' border rounded -mt-11p-2 py-3 w-[49%]'
      name='firstName'
      placeholder='First_name' 
      value={inputs.firstName}
      onChange={handleChange}
      />
      <input type='text'
      className=' border rounded -mt-11p-2 py-3 w-[49%]'
      name='lastName'
      placeholder='last_name' 
      value={inputs.lastName}
      onChange={handleChange}
      />
    </div>}
      <div className='my-3 flex justify-between text-sm'>
      <input type='text'
       className=' border rounded -mt-11p-2 py-3 w-full'
       placeholder='Email' 
       value={inputs.email}
       name='email'
       onChange={handleChange}
       />
      </div>
      {isSignIn?null:<div className='my-3 flex justify-between text-sm'>
     
     <input type='text'
      className=' border rounded -mt-11p-2 py-3 w-[49%]'
      placeholder='Phone' 
      value={inputs.phone}
      name='phone'
      onChange={handleChange}
      />
      <input type='text'
      className=' border rounded -mt-11p-2 py-3 w-[49%]'
      placeholder='City' 
      value={inputs.city}
      name='city'
      onChange={handleChange}
      />
     </div>}
     <div className='my-3 flex justify-between text-sm'>
      <input type='password'
       className=' border rounded -mt-11p-2 py-3 w-full'
       placeholder='Password' 
       value={inputs.password}
       name='password'
       onChange={handleChange}
       />
      </div>
    </div>
  )
}

export default AuthModalInputs