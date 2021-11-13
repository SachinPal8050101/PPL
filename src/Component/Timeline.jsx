import React from 'react'
import UploadPost from './UploadPost'
import Features from './Features'
import Categories from './Categories'
import TimelineTop from './TimelineTop'
import Post from './Post'
function Timeline() {
  return (
    <>

       <div className="container">
         <div className="content">
               <div className="content_lft">
                  <TimelineTop/>
                  <Post/>
               </div>
          {/* rigth Content */}
        <div className="content_rgt">
         <UploadPost/>
         <Categories/>
         <Features/>
      </div>
       </div>
       </div>
       
    </>
  )
}

export default Timeline
