import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ueHistory,useLocation } from 'react-router-dom'
import axios from 'axios'
function ForgotPassword() {
  let history = useHistory()
  let location = window.location.href
  const [forgotEmail, setforgotEmail] = useState()
  const [AllUserData, setAllUserData] = useState([])
  const handle = (e) => {
    setforgotEmail(e.target.value)
  }
  const Submit = () => {
    axios({
      method: 'POST',
      data: {forgotEmail:forgotEmail,location:location},
      withCredentials: true,
      url: 'http://localhost:5000/forgotEmail',
    }).then((res) => { 
      if (res.data.status){
       
        console.log(res.data.data._id)
        history.push(`/resetPassword/${res.data.data._id}`)
      } else {
           alert("link has been send to your mail id")
      }
    })
  }
  return (
    <>
      <div className="container">
        <div className="content">
          {/* containet Left */}
          <div className="content_lft">
            <h1>Welcome from PPL!</h1>
            <p className="discrptn">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text.{' '}
            </p>
            <img src="images/img_9.png" alt />{' '}
          </div>
          {/* containet Right */};
          <div className="content_rgt">
            <div className="register_sec">
              <h1>Forgot Password</h1>
              <ul>
                <li>
                  <span>Enter E-mail ID</span>
                  <input
                    type="text"
                    value={forgotEmail}
                    onChange={handle}
                    placeholder="User@gmail.com"
                  />
                </li>
                <li>
                  <a to="/ResetPassword">
                    {' '}
                    <input
                      type="submit"
                      onClick={Submit}
                      defaultValue="Submit"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
