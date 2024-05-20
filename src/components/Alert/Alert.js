import React from 'react'

export default function Alert(props) {

  function changecase(word) {
    // console.log(word)

    if (word){

        let newword = word[0].toLowerCase()
        newword = newword + word.slice(1)
        
        // console.log(newword)
        return newword
    }


  }
  return (
    <div style={{ "height":"60px" }}>
      {props.alert && <div>
        <div className={`alert alert-dismissible fade show alert-${changecase(props.alert.action)}`} role="alert">
          <strong>{props.alert.action}</strong> {props.alert.message}.
          {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
        </div>

      </div>}

     </div>
  )
}
