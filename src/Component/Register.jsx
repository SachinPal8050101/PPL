import React from 'react'
import {Link,useHistory} from 'react-router-dom'
import {useState,useEffect} from 'react'
import axios from 'axios'
function Register({setLogInUser}) {
  let history=useHistory()
  const [RegisterData,setRegisterData] =useState({
    username:'',
    password:'',
    email:'',
    firstname:'',
    lastname:''
  })
    const [AllRegisterData,setAllRegisterData]=useState(()=>{
      let val=localStorage.getItem('AllUserDetails')
      if(val!==null){
        return JSON.parse(val)
      }
      else{
        return []
      }
  })

  const handle=(e)=>{
      setRegisterData({...RegisterData,[e.target.name]:e.target.value})
  }

  const handlePrevent=(e)=>{
   e.preventDefault();
  }

  const submit=()=>{
        //  setAllRegisterData(AllRegisterData.concat([RegisterData]))
        //  localStorage.setItem('AllUserDetails',JSON.stringify(AllRegisterData))  
        const {username,password,email,firstname,lastname}=RegisterData
        // fetch('http://localhost:5000/register',{method: "POST", body:RegisterData}).then(res=>console.log(res)) 
     /// cheack email does exit or not 



        axios({
          method: "POST",
          data: RegisterData,
          withCredentials: true,
          url: 'http://localhost:5000/register',
        }).then(res=>{
          console.log(res.data.user)
          setLogInUser(res.data.user)
          if(res.data.status){
            console.log('added')
            history.push('/')
          }else{
            console.log('not aded')
          }
        }) 
      
  }

  return (
    <>   
     <div className="container">
        <div className="content">
  <div className="content_rgt">
    <div className="register_sec">
      <form onSubmit={handlePrevent}>
      <h1>Create An Account</h1>
      <ul>
        <li>
          <span>Username</span>
          <input type="text" name="username" value={RegisterData.username} onChange={handle} placeholder="Enter your username" required/>
        </li>
        <li>
          <span>Password</span>
          <input type="password"  name='password' value={RegisterData.password} onChange={handle} placeholder="Enter your password" required/>
        </li>
        <li>
          <span>Email</span>
          <input type="text"  name="email" value={RegisterData.email} onChange={handle} placeholder="Enter your email" required/>
        </li>
        <li>
          <span>First Name</span>
          <input type="text" name="firstname" value={RegisterData.firstname} onChange={handle} placeholder="Enter your first name" required/>
        </li>
        <li>
          <span>Last Name</span>
          <input type="text" name="lastname" value={RegisterData.lastname} onChange={handle} placeholder="Enter your last name" required/>
        </li>
        <li>
          <input type="checkbox" name="checkbox"/>I agree to Term &amp; Conditions
        </li>
        <li>
          <input type="submit" onClick={submit} defaultValue="Register" />
        </li>
      </ul>
      </form>
      <div className="addtnal_acnt">
        I already have an account.<Link to="/login">Login My Account !</Link>
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
    <img src="images/img_9.png" alt />{" "}
  </div>
</div>
</div>
    </>
  )
}

export default Register
