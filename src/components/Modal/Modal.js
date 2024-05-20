import React, { useState } from 'react'
import Authcontext from '../../context/auth/authcontext'
import { useContext } from 'react'

// INTERESTING THING I've OBSERVED
// in this below code i was using this user recieved in props to initialize the currentuser
// but what i thought was wrong is, this user is at first empty but when useeffect runs in parent component or in navbar component it gets a value so even this currentuser in this component should show the same value but i was wrong
// so when this user is updated all the components using this user should update and exactly that was happening 
// now in this component i used user to initialize the 'currentuser' 
// but since user was at first empty object so its gettint initialized to an empty object 
// now when useeffect updates  user it wont reinitialise the currentuser because a state can only be initialized once
// thats why it was printing an empty object even when in parent element user was printing details of user.
// Simpler way is to use the user from authcontext directly but that would also cause a problem that, if i need to make changes in the modal ie i need to make changes in the user 
// that would mean i am changing user directly and then i dont update user its value in front end would change because its value in the authcontext would have changed


const Modal = ({modalref,currentdetails,setcurrentdetails}) => {

// ====================================================================
// const Modal = ({modalref,user}) => {

    // const [currentuser,setcurrentuser] = useState(user)
    
    // console.log("currentuser : ",currentuser)
    // console.log("user in props :",user)

// =================================================================


    const context = useContext(Authcontext)
    const{updatedetails}= context;

// ==================================================================

const handlechange=(e)=>{
setcurrentdetails({...currentdetails,[e.target.name]:e.target.value})
// console.log(currentdetails)
}

// console.log(currentdetails)



  return (
    <>
    <button  type="button" ref = {modalref}className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
      {/* NOTE: READ IN handleclick() */}
    </button>

    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">EDIT USER DETAILS</h1>

            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body ">
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">FULL NAME</label>
                <input type="text" className="form-control" name='name' id="title" value={currentdetails.name?currentdetails.name:""} onChange={handlechange}  aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
    <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={currentdetails.email?currentdetails.email:""} onChange={handlechange} placeholder='example@gmail.com'/>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button disabled={false} type="button" className="btn btn-primary" onClick={() => {updatedetails(currentdetails); modalref.current.click()}}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default Modal