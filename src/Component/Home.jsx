import React, { useEffect ,useRef} from 'react'
import Post from './Post'
import FeaturesBar from './FeaturesBar'
import UploadPost from './UploadPost'
import Categories from './Categories'
import Features from './Features'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import config from '../cofig'
function Home(props) {
  let history = useHistory()
   
  axios({
    method:"post",
    data:{'token':localStorage.getItem('Token')},
    url:`${config.SERVER_URL}/`
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

  axios.interceptors.request.use((req)=>{
    console.log('hhhhhhhhhh',req);
    return req;
  })

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
