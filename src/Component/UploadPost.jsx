import React from 'react'
import UploadPostContent from './UploadPostContent'
import {useState} from 'react'
import {Link} from 'react-router-dom'
function UploadPost() {
 var trigger=false
const [buttonpopup,setbuttonpopup]=useState(false)

const handleChange=()=>{
          if(buttonpopup)
          {
            setbuttonpopup(false)
          }
          else{
            setbuttonpopup(true)
          }
}
  return (
    <>
        <div className="rght_btn">
  {" "}
  <span className="rght_btn_icon">
    <img src="images/btn_iconb.png" alt="up" />
  </span>{" "}
  <span className="btn_sep">
    <img src="images/btn_sep.png" alt="sep" />
  </span>{" "}
  
  <a onClick={handleChange}>Upload Post</a>{" "}

  {
  (buttonpopup)?<UploadPostContent />:null
  }
  
     
  
</div>
<div className="rght_btn">
  {" "}
  <span className="rght_btn_icon">
    <img src="images/btn_icona.png" alt="up" />
  </span>{" "}
  <span className="btn_sep">
    <img src="images/btn_sep.png" alt="sep" />
  </span>{" "}
  <a href="#">Invite Friends</a>{" "}
</div>
    </>
  )
}

export default UploadPost
