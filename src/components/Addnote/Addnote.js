import React, { useState , useContext } from 'react'
import Notescontext from '../../context/notes/notescontext'

 const Addnote = (props) => {

    const {addnote} = useContext(Notescontext)

    const [details ,setdetails] = useState({title:"",description:"",tag:""})


    const handlechange = (e)=>{


        setdetails({...details,[e.target.name] : e.target.value} )
       
    }

    const handleclick =(e)=>{

        e.preventDefault();
        addnote(details.title,details.description,details.tag)
        setdetails({title:"",description:"",tag:""})
        props.showalert("Success","Note added successfully")


    }

  return (
    <>
    <h2>Add a new note</h2>
    <form>
    <div className="mb-3">
      <label htmlFor="title" className="form-label">Title</label>
      <input type="text" minLength={5} className="form-control" name='title' id="title" value={details.title} onChange={handlechange} aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
      <label htmlFor="description" className="form-label">Description</label>
      <input type="text" minLength={10} className="form-control" name='description' id="description" value={details.description} onChange={handlechange} />
    </div>
    <div className="mb-3">
      <label htmlFor="tag" className="form-label">Tag</label>
      <input type="text" minLength={5} className="form-control" name='tag' id="tag" value={details.tag} onChange={handlechange} />
    </div>
    <div className="mb-3 form-check">
      <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
      <label className="form-check-label" htmlFor="exampleCheck1" >Check me out</label>
    </div>
    <button disabled={details.title.length<5||details.description.length<10||details.tag.length<5?true:false} type="button" className="btn btn-primary" onClick={handleclick}>Submit</button>
  </form>
  </>

  )
}

export default Addnote
