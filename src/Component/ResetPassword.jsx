import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import {Link,useHistory,useParams} from 'react-router-dom'
function ResetPassword({setLogInData,setLogInUser}){
  let history=useHistory()
  const { id } = useParams();

  const [forgotPassword,setforgotPassword]=useState({
    fpassword:'',
    cfpassword:''
  })

  const handle=(e)=>{
    setforgotPassword({...forgotPassword,[e.target.name]:e.target.value})
  }

   const submit=(e)=>{
       e.preventDefault()
      console.log(id)
       if(forgotPassword.fpassword===forgotPassword.cfpassword)
       {
           axios({
             method:'post',
             url:'http://localhost:5000/resetpassword',
             data:{id:id,forgotPassword:forgotPassword.fpassword}
           }).then((res)=>{
            console.log(res.data.data)
            setLogInUser(res.data.data)
            localStorage.setItem('LogInUser',JSON.stringify(res.data.data))
            localStorage.setItem('Token',123)
               history.push("/")
           })
       }
       else{
         alert("password not matched")
       }
   }

  return (
    <>
     <div className="container">
  <div className="content">
    <div className="content_rgt">
      <div className="register_sec">
        <h1>Reset Password</h1>
        <form onSubmit={submit}>
        <ul>
          <li>
            <span>Enter New Password</span>
            <input type="text" placeholder="Enter your new password" name="fpassword" value={forgotPassword.fpassword}  onChange={handle} />
          </li>
          <li>
            <span>Confirm Password</span>
            <input type="text" placeholder="Enter your password again" name="cfpassword" value={forgotPassword.cfpassword} onChange={handle} />
          </li>
          <li>
            <input type="submit" defaultValue="Submit"  />
          </li>
        </ul>
        </form>
      </div>
    </div>
    <div className="content_lft">
      <h1>Welcome from PPL!</h1>
      <p className="discrptn">
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form, by injected humour, or
        randomised words which don't look even slightly believable. If you are
        going to use a passage of Lorem Ipsum, you need to be sure there isn't
        anything embarrassing hidden in the middle of text.{" "}
      </p>
      <img src="images/img_9.png" alt />{" "}
    </div>
  </div>
</div>
 
    </>
  )
}

export default ResetPassword
