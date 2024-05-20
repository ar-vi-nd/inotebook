import React, { useEffect, useRef, useState } from 'react'
import Noteitem from '../Noteitem/Noteitem'
import { useContext } from 'react'
import Notescontext from '../../context/notes/notescontext'
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
  const navigate = useNavigate()

  const context = useContext(Notescontext)
  // const { notes, fetchnotes, setnotes, updatenote } = context

  const { notes, fetchnotes, updatenote } = context

  // IMPORTANT : when i refresh the page i want the user to stay logged in so thats why i saved the jwt token in the local storage
  // now there is one catch in how to use this token to keep user logged in
  // always do this step in a useEffect i.e. fetching the authtoken from localstorage and fetch the notes should be done after this whole component is rendered
  // otherwise you'll get an error that cannot update component {notsstate} while another component{Notes} is being rendered 
  // Similarly is the case for fetching users info using token in navbar component to render users name when you refresh the tab
  // the reason could be due to the fact that you should only update a state inside a function

  useEffect(() => {
    let authtoken = localStorage.getItem('token')
    if(authtoken){
    fetchnotes(authtoken)
    }
    else(
      navigate('/login')
    )
 
    // eslint-disable-next-line 
  }, [])

  const ref = useRef(null)

  const editnote = (note) => {
    // const { title, description, tag } = note
    // i could use any of the methods, by destructuring or simply using the note
    const { title } = note
    ref.current.click()
    setcurrentnote({ title, description: note.description, tag: note.tag, id: note._id })
  }


  const [currentnote, setcurrentnote] = useState({ title: "", description: "", tag: "" })

  const handlechange = (e) => {
    setcurrentnote({ ...currentnote, [e.target.name]: e.target.value })

  }

  const handleclick = (id) => {
    // const newnotes = notes.map((note)=>{if(note._id==id){return {...note,title:currentnote.title,description:currentnote.description,tag:currentnote.tag}}return note})
    // console.log(newnotes)
    // setnotes(newnotes)
    // i could also write this whole functioin inside the setnotes function

    updatenote(id, currentnote.title, currentnote.description, currentnote.tag)
    ref.current.click()
    // Note explained: here i have took the reference of the 'launch modal' button to close and it works also because clicking in the button twice closes the modal, but the button isnt 
    // visible to click but still works. What i should have done is that i should have done is I should have created another reference to the close button and clicked it.
    props.showalert("Success","Note updated successfully")
  }

  return (

    <>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
        {/* NOTE: READ IN handleclick() */}
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>

              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body ">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" name='title' id="title" value={currentnote.title} onChange={handlechange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" name='description' id="description" value={currentnote.description} onChange={handlechange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" name='tag' id="tag" value={currentnote.tag} onChange={handlechange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={currentnote.title.length<5||currentnote.description.length<10||currentnote.tag.length<5?true:false} type="button" className="btn btn-primary" onClick={() => { handleclick(currentnote.id) }}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        
        {notes.length===0?<h2>
        No notes to display
        </h2>:<h2>Your Notes</h2>}
        {notes.map((note) => {
          return <Noteitem key={note._id} title={note.title} description={note.description} tag={note.tag} id={note._id} editnote={editnote} note={note} showalert={props.showalert} />
        })}
      </div>

    </>
  )
}

export default Notes