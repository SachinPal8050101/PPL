import React, { useEffect } from 'react'
import Post from './Post'
import FeaturesBar from './FeaturesBar'
import UploadPost from './UploadPost'
import Categories from './Categories'
import Features from './Features'
import { useHistory, Link } from 'react-router-dom'
function Home(props) {
  let history = useHistory()

  useEffect(() => {
    if (!localStorage.getItem('Token')) {
      history.push('./login')
    }
  }, [])

  return (
    <>
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <Link to="/uploadpostcontent">
              <UploadPost />
            </Link>
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
