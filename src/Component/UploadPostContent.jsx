import React, { useContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import './Uploadpostcontent.css'
function UploadPostContent() {
  const userId = JSON.parse(localStorage.getItem('LogInUser'))._id
  const [postData, setpostData] = useState({
    title: '',
    category: '',
    image: '',
    userId: userId,
  })
  const handle = (e) => {
    setpostData({ ...postData, [e.target.name]: e.target.value })
  }
  
  const submit = (e) => {
    e.preventDefault()
    let formdata = new FormData(e.target)
    formdata.append('userId', JSON.parse(localStorage.getItem('LogInUser'))._id)
    formdata.append('fullName',JSON.parse(localStorage.getItem('LogInUser')).firstname+" "+JSON.parse(localStorage.getItem('LogInUser')).lastname)
    axios({
      method: 'POST',
      data: formdata,
      withCredentials: true,
      url: 'http://localhost:5000/UploadPostContent',
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    }).then((res) => {
      if (res.data.status) {
          alert(res.data.message)
      } else {
        console.log('not aded')
      }
    })
  }

  return (
    <>
      <form onSubmit={submit}  style={{"font-size": '15px'},{'color':'white'}}>
        <lable>Title</lable>
        <input  style={{ 'margin': '19px 0 21px 40px'}}  type="text" name="title" onChange={handle} /> <br/>
        <lable>Category</lable>
        <select  style={{'margin': '0 0 0 5px'}} name="category" onChange={handle}>
          <option value="Cat" selected>
            Cat
          </option>
          <option value="Dog">Dog</option>
          <option value="Rabbit">Rabbit</option>
          <option value="Bird">Bird</option>
          <option value="Other">Other</option>
        </select> <br/>
        <lable>Chose Photos</lable>
        <input type="file" name="image" onChange={handle} />
        <br/>
        <input className="btn btn-success" style={{'margin': '27px 6px 12px 4px'}}  type="submit" />
      </form>
    </>
  )
}
export default UploadPostContent
