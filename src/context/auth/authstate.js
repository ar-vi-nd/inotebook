import React,{ useState} from "react";
import Authcontext from "./authcontext";

const Authstate= (props)=>{

    const [authtoken,setauthtoken]= useState()
    const [user,setuser] = useState({})

    const setauth = async (token)=>{
        setauthtoken(token)
        // console.log("here")
        try {          
            const response = await fetch("http://127.0.0.1:5000/api/auth/fetchuserdetails",{
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token":token
            }
          }) 
          let data = await response.json()
          if(response.ok){
            // console.log("data : ",data)
            setuser(data.user)
          }else{
            console.log("error : ",data)
          }       
          } catch (error) {
            console.log("catch error : ",error)
          }  

    }

    const updatedetails = (data)=>{
        setuser(data)
    }

   

    const deleteuserdetails = ()=>{
        setuser(null)
    }

    return(
        <Authcontext.Provider value={{authtoken,user,setauth,deleteuserdetails,updatedetails}}> {props.children}</Authcontext.Provider>
    )

}

export default Authstate