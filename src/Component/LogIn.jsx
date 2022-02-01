import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import axios from 'axios'
import config from '../cofig'
function LogIn({setLogInUser,LogInData,setLogInData}) {
  localStorage.clear()
  let history=useHistory()
  console.log('oiuytrtyu')
   const handle=(e)=>{
     setLogInData({...LogInData,[e.target.name]:e.target.value})
   } 
    const submit=()=>{
    const {email,password}=LogInData
    axios({
      method:"POST",
      data: LogInData,
      withCredentials: true,
      url: `${config.SERVER_URL}/login`,
    }).then(res=>{
      alert(res.data.messages)
      setLogInUser(res.data.user)
      localStorage.setItem('LogInUser',JSON.stringify(res.data.user))
      localStorage.setItem('Token',res.data.token)
         history.push("/")
    })  

     }
  
    // const fun=(AllLogInData)=>{
    //   setAllRegisterDataFromLocalStorage(localStorage.getItem('AllUserDetails'))
    //   let ls=JSON.parse(AllRegisterDataFromLocalStorage)
    //      return ls.find(item=>(item.email===AllLogInData.email && item.password===AllLogInData.password))
    // }

  return (
    <>
    <div className="container">
      <div className="content">
  <div className="content_rgt">
    <div className="login_sec">
   
      <h1>Log In</h1>
      <ul>
        <li>
          <span>Email-ID</span>
          <input type="text"  name="email"  onChange={handle} placeholder="Enter your email" />
        </li>
        <li>
          <span>Password</span>
          <input type="text" name="password" onChange={handle} placeholder="Enter your password" />
        </li>
        <li>
          <input type="checkbox" />
          Remember Me
        </li>
        <li>
          <input type="submit" onClick={submit} defaultValue="Log In" />
          <Link to="/ForgotPassword" href>Forgot Password</Link>
        </li>
      </ul>
      <div className="addtnal_acnt">
        I do not have any account yet.<Link to="/register">Create My Account Now !</Link>
      </div>
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
    <img src="images/img_9.png" alt />
  </div>
</div>
</div>
    </>
  )
}

export default LogIn
