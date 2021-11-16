import React, { useEffect } from 'react'
import Post from './Post'
import FeaturesBar from './FeaturesBar'
import UploadPost from './UploadPost'
import Categories from './Categories'
import Features from './Features'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
function Home(props) {
  let history = useHistory()
   
  axios({
    method:"post",
    data:{'token':localStorage.getItem('Token')},
    url:'http://localhost:5000/'
  }).then((res)=>{
    if(!res.data.status)
    {
      history.push('/login')
      console.log(res.data.status)
      localStorage.clear()
      
    }
  })


  // useEffect(() => {
  //   if (!localStorage.getItem('Token')) {
  //     history.push('./login')
  //   }
  // }, [])

  return (
    <>
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            
              <UploadPost />
          
            <Categories setresultAllPost={props.setresultAllPost} />
            <Features />
          </div>

          <div className="content_lft">
            <FeaturesBar />
            <Post
              resultAllPost={props.resultAllPost}
              setresultAllPost={props.setresultAllPost}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
