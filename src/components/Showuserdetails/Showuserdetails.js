import React,{useEffect, useRef, useState} from 'react'
import { useContext } from 'react'
import Authcontext from '../../context/auth/authcontext'
import { useNavigate } from 'react-router-dom'
import Modal from '../Modal/Modal'

// PASSING REF TO A CHILD COMPONENT
// in this specific example i have shown something intresting 
// here i create a ref i.e. modalref and assign it value null
// then i pass this ref to Modal component
// in the modal i use the ref to refer to a button which triggers modal
// and it actually works


const Showuserdetails = () => {

  const navigate = useNavigate()

    
  const context = useContext(Authcontext)
  const {authtoken,user,setauth} = context

  const modalref = useRef(null)

  const [currentdetails,setcurentdetails] = useState(user)

//   useEffect(() => {
//     let token = localStorage.getItem('token')
//     // console.log(authtoken)

//     if(token){
//         setauth(localStorage.getItem('token'))
//     }
//     else(
//       navigate('/login')
//     )
 
//     // eslint-disable-next-line 
//   }, [])

  const edituser = ()=>{
    setcurentdetails(user)
    modalref.current.click()
  }
//   console.log("user in showdetails", user)
  return (
    <>
    {/* {user.name &&<Modal modalref={modalref} user = {user}></Modal>} */}
    <Modal modalref={modalref} user = {user} currentdetails={currentdetails} setcurrentdetails={setcurentdetails}></Modal>
<div className="card text-center">
  <div className="card-header">
    <h2>USER DETAILS</h2>
  </div>
  <div className="card-body">
    <h5 className="card-title">{user.name}</h5>
    <p className="card-text">{user.email}</p>
    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
  </div>
  <div className="card-footer text-body-secondary">
    1 day ago
  </div>
 <button className='btn btn-primary' onClick={edituser}>Edit User</button>
</div>
</>

  )
}

export default Showuserdetails