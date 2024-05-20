import React from 'react'
import Addnote from '../Addnote/Addnote'
import Notes from '../Notes/Notes'

const Home = (props) => {
  return (
    <>
    <Addnote showalert={props.showalert}/>
    <Notes showalert={props.showalert}/>
    </>
  )
}

export default Home