import React,{ useState} from "react";
import Notescontext from "./notescontext";


// const Notesstate = (props)=>{

//    let obj = {"name": "mike", age:23}

//    const [state,setState] = useState(obj)

//    const update = ()=>{
//     setTimeout(() => {

//         let  newobj= {...obj}
//         newobj.age = 75

//         setState(newobj)
        
//     }, 3000);
//    }

//     return(
//         <Notescontext.Provider value={{state,update}}>{props.children}</Notescontext.Provider>
          
//     )
// }

const Notesstate =(props)=>{

   const initialnotes =[]

    const [notes,setnotes] = useState(initialnotes)  

    const fetchnotes = async (authtoken)=>{

        const response = await fetch(`http://127.0.0.1:5000/api/notes/fetchallnotes`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              // "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxNWU2NzhiNDNkN2M4YjA2MjUxY2I3In0sImlhdCI6MTcxMjcxMTMyOX0.8XWr1fBzJ0S05wRU_0IOpbNuOOPId5rO-TrQuhYdUbY"
              "auth-token":authtoken
            }
          });
           let returneddata = await response.json(); // parses JSON response into native JavaScript objects
        //    console.log("fetch notes called",returneddata)
           setnotes(returneddata)


    }


    const addnote = async (title,description,tag)=>{
        console.log(` New Note Added \n title : ${title} ,description : ${description} , tag : ${tag}`)

        // console.log(obj)
        // obj.push({title,description,tag})
        // setnotes(obj)
        // this wont work because the obj.push would push a new object in obj but setnote wont identify the difference bw old obj and new obj
        // console.log(obj)
        // setnotes(notes.concat({title,description,tag}))

    const response = await fetch(`http://127.0.0.1:5000/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });

    const statusCode = response.status;
console.log("Status Code:", statusCode);

if (response.ok) {
    let returneddata = await response.json();
    console.log(returneddata.note)
    setnotes([returneddata.note,...notes])
  } else {
    console.log("Error:", response.statusText);
  }
  }


    const deletenote = async (id)=>{
       
        const response = await fetch(`http://127.0.0.1:5000/api/notes/deletenote/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
              "auth-token":localStorage.getItem('token')
            },
          });
      
          const statusCode = response.status;
      console.log("Status Code:", statusCode);
      
      if (response.ok) {
        //   let returneddata = await response.json();
        //   console.log(returneddata)
          const newnotes = notes.filter((note)=>{return note._id!==id})
          setnotes(newnotes)
        } else {
          console.log("Error:", response.statusText);
        }
    }


    const updatenote = async (id,title,description,tag)=>{
        const response = await fetch(`http://127.0.0.1:5000/api/notes/updatenote/${id}`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
              "auth-token":localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
          });
          const statusCode = response.status;
          console.log("Status Code:", statusCode);
          if (response.ok) {
            //   let returneddata = await response.json();
            //   console.log(returneddata)
    const newnotes = notes.map((note)=>{if(note._id===id){return {...note,title:title,description:description,tag:tag}}return note})
 
              setnotes(newnotes)
            } else {
              console.log("Error:", response.statusText);
            }
      

    }

    return(
        <Notescontext.Provider value={{notes, setnotes ,addnote , fetchnotes,deletenote,updatenote}}>{props.children}</Notescontext.Provider>
    )

}


export default Notesstate