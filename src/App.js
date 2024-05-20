import logo from './logo.svg';
import './App.css';
import  Navbar  from './components/Navbar/Navbar';
import About from './components/About/About'
import Home from './components/Home/Home'
import Login from './components/Login/Login';
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import Notesstate from './context/notes/notesstate'
import Signup from './components/Signup/Signup';
import Alert from './components/Alert/Alert';
import { useState } from 'react';
import Showuserdetails from './components/Showuserdetails/Showuserdetails';
import Authstate from './context/auth/authstate';

function App() {
  const [alert,setalert]= useState()
  const showalert =(action,message)=>{
    console.log(action,message)
    setalert({ action: action, message: message });
    setTimeout(() => {
      setalert();
    }, 1500);
  }
  return (

    <Authstate>
   <Notesstate>

    <Router>
     <Navbar/>
     <Alert alert={alert}></Alert>

     <div className="container">


     <Routes>
        <Route path='/' exact element = {<Home showalert={showalert}/>}/>
        <Route path='/about' exact element = {<About showalert={showalert}/>}/>
        <Route path='/login' exact element = {<Login showalert={showalert}/>}></Route>
        <Route path='/signup' exact element = {<Signup showalert={showalert}/>}></Route>
        <Route path='/showfulldetails' exact element = {<Showuserdetails/>}></Route>
         
       
      </Routes>
     </div>
    </Router>

   </Notesstate>
   </Authstate>
 
  );
}

export default App;
