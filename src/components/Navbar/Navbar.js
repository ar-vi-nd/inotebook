import React, {  useEffect } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import Authcontext from '../../context/auth/authcontext'

 // useEffect(()=>{
  //   console.log(location)
  // },[location])

 const  Navbar = () => {

  const context = useContext(Authcontext)
  const {authtoken,user,setauth ,deleteuserdetails} = context
  // console.log(authtoken," user : ",user)

  let navigate = useNavigate()
  let location = useLocation();

  useEffect(() => {
    let token = localStorage.getItem('token')
    // console.log(authtoken)

    if(token){
        setauth(localStorage.getItem('token'))
    }
    else(
      navigate('/login')
    )
 
    // eslint-disable-next-line 
  }, [])

  const handlelogout = ()=>{
    localStorage.removeItem('token')
    deleteuserdetails()
    navigate('/login')
  }
  
  return (

    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">iNotebook</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==='/'?'active':''}`} aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==='/about'?'active':''}`} to="/about">About</Link>
          </li>
        </ul>
          {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/> */}
        {!localStorage.getItem('token')? 
        <form className="d-flex" role="search">
        <Link  to="/login"><button className="btn btn-primary mx-2" type="submit">Login</button></Link>
         <Link to= "/signup"> <button className="btn btn-primary" type="submit">Signup</button></Link>
        </form>
         :<form>
         <Link to="/showfulldetails"><button className="btn btn-primary mx-2" type="submit" >{user===null?'unknown':user.name}</button></Link>
         <button className="btn btn-primary" type="submit" onClick={handlelogout}>Logout</button>
         </form>
 }
         
      </div>
    </div>
  </nav>
  )
}

export default Navbar;
