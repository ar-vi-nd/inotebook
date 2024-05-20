import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import Authcontext from '../../context/auth/authcontext'

const Signup = (props) => {
  const context = useContext(Authcontext)
  const {setauth} = context
    const [signup,setsignup] = useState({fullname:'',email:'',password:''})
    const navigate = useNavigate()
    const handlechange = (e)=>{

        let newsignup = {...signup,[e.target.name]: e.target.value}
        setsignup(newsignup)
        // console.log(signup)
    }


        const handlesubmit = async(e)=>{
          e.preventDefault()
          console.log("form submitted with fullname : ",signup.fullname," email : ",signup.email," password : ",signup.password)
          try{
          const response = await fetch(`http://127.0.0.1:5000/api/auth/createuser`, {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
              headers: {
                "Content-Type": "application/json",
              },
              body:JSON.stringify({name:signup.fullname,email:signup.email,password:signup.password})
            });
            let returneddata = await response.json(); // parses JSON response into native JavaScript objects
             if(response.ok){
              localStorage.setItem('token',returneddata.authtoken)
            setauth(returneddata.authtoken)

            navigate('/')
            props.showalert("Success","Signed up successfully")
             }else{
              console.log(returneddata)
              props.showalert('Danger',returneddata.error)
             }
          }catch(error){
            console.log("error : ",error)
          }
      }
    




  return (
    <>
    <h2>Signup</h2>
    <form onSubmit={handlesubmit}>
    <div className="mb-3 my-5">
    <label htmlFor="exampleInputFullName" className="form-label">Full Name</label>
    <input type="text" name="fullname" className="form-control" id="exampleInputFullName" placeholder='min 3 characters' value={signup.fullname} onChange={handlechange} minLength={3} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
    <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='example@gmail.com' value={signup.email} onChange={handlechange} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name='password' className="form-control" id="exampleInputPassword1" placeholder='min 7 characters'value={signup.password} onChange={handlechange} minLength={7} required/>
  </div>
  <button type="submit" disabled={signup.fullname.length<3||signup.password.length<7?true:false} className="btn btn-primary" >Submit</button>
</form>

    </>
  )
}

export default Signup