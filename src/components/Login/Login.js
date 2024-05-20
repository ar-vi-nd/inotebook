import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import Authcontext from '../../context/auth/authcontext'

const Login = (props) => {

  const context = useContext(Authcontext)
  const {setauth} = context

    const [login,setlogin] = useState({email:'',password:''})
    const navigate = useNavigate() 

    const handlechange = (e)=>{

        let newlogin = {...login,[e.target.name]: e.target.value}
        setlogin(newlogin)
        // console.log(login)
    }
    const handlesubmit = async(e)=>{
        e.preventDefault()
        // console.log("form submitted with email : ",login.email," password : ",login.password)
        try{
        const response = await fetch(`http://127.0.0.1:5000/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({email:login.email,password:login.password})
          });
          let returneddata = await response.json(); // parses JSON response into native JavaScript objects
           if(response.ok){
            // console.log(returneddata)
            localStorage.setItem('token',returneddata.authtoken)
            props.showalert("Success","Logged in successfully")
            setauth(returneddata.authtoken)
            navigate('/')
           }else{
            props.showalert('Danger',returneddata.error)
           }
        }catch(error){
          console.log("error : ",error)
        }
    }




  return (
    <>
    <h2>Login</h2>
    <form onSubmit={handlesubmit}>
  <div className="mb-3 my-5">
    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
    <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='example@gmail.com' value={login.email} onChange={handlechange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name='password' className="form-control" id="exampleInputPassword1" value={login.password} onChange={handlechange}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </>
  )
}

export default Login