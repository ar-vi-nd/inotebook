import React from 'react'
import { useContext } from 'react'

import Notescontext from '../../context/notes/notescontext'

const Noteitem = (props) => {
  const context = useContext(Notescontext)
  const {deletenote} = context
  const {title,description,tag,editnote,note} = props

  const handledelete = (id)=>{

    deletenote(id)

  }
  // console.log(props)
  return (
<div className="col-md-3 my-2" style={{width: '18rem'}}>
  <ul className="list-group list-group-flush"> 
    <li className="list-group-item">{title} </li>
    <li className="list-group-item">{description}</li>
    <li className="list-group-item">{tag}</li>
  </ul>
  <div className="d-flex align-items-center"><i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{editnote(note)}}></i><i className="fa-sharp fa-solid fa-trash mx-3" onClick={()=>{handledelete(props.id);props.showalert("Success","Note deleted successfully")}}></i></div>
</div>
  )
}

export default Noteitem