import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import config from '../cofig'
function Post(props) {
  let history = useHistory()
  useEffect(() => {
    if (!localStorage.getItem('Token')) {
      history.push('./login')
    }
    getData()
  }, [])
  var skip = 0
  window.onscroll = function (ev) {
    if (
      window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight + 84
    ) {
      skip = skip + 2
      const getData = () =>
        axios({
          method: 'post',
          url: `${config.SERVER_URL}/getPost`,
          data: { skip: skip },
        }).then((result) => {
          props.setresultAllPost(result.data)
        })
      getData()
    }
  }

  const getData = () =>
    axios({
      method: 'post',
      url: `${config.SERVER_URL}/getPost`,
    }).then((result) => {
      props.setresultAllPost(result.data)
    }).catch(err=>console.log('dfghjk--------',err))

  /// code for likes
  var valForLike = false
  var valForunlike = false
  const handleLike = (postId, userId) => {
    var value = document.getElementById(`likePost_${postId}_${userId}`)
      .innerHTML
    if (valForLike === false) {
      document.getElementById(`likePost_${postId}_${userId}`).innerHTML =
        parseInt(value) + 1
      valForLike = true
    } else {
      document.getElementById(`likePost_${postId}_${userId}`).innerHTML =
        parseInt(value) - 1
      valForLike = false
    }
    axios({
      method: 'Post',
      url: `${config.SERVER_URL}/like`,
      data: { postId, userId },
    }).then((result) => {
      props.setresultAllPost(result.data)
    })
  }
  // code for unlike
  const handleUnLike = (postId, userId) => {
    var value = document.getElementById(`unlikePost_${postId}_${userId}`)
      .innerHTML
    if (valForunlike === false) {
      document.getElementById(`unlikePost_${postId}_${userId}`).innerHTML =
        parseInt(value) + 1
      valForunlike = true
    } else {
      document.getElementById(`unlikePost_${postId}_${userId}`).innerHTML =
        parseInt(value) - 1
      valForunlike = false
    }
    axios({
      method: 'Post',
      url: `${config.SERVER_URL}/unlike`,
      data: { postId, userId },
    }).then((result) => {
      props.setresultAllPost(result.data)
    })
  }

  return (
    <>
      {props.resultAllPost?.length !== 0
        ? props.resultAllPost.map((val) => (
            <div className="contnt_2">
              <div className="div_a">
                <div className="div_title">{val.title}</div>
                <div className="btm_rgt">
                  <div className="btm_arc">{val.category}</div>
                </div>
                <div className="div_top">
                  <div className="div_top_lft">
                    <img src="images/img_6.png" />
                    {val.fullName}
                  </div>
                  <div className="div_top_rgt">
                    <span className="span_date">{val.date}</span>
                    <span className="span_time">{val.time}</span>
                  </div>
                </div>
                <div className="div_image">
                  <img src={val.image} alt="pet" />
                </div>
                <div className="div_btm">
                  <div className="btm_list">
                    <ul>
                      <li>
                        <a href="#">
                          <span className="btn_icon">
                            <img src="images/icon_001.png" alt="share" />
                          </span>
                          Share
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="btn_icon">
                            <img src="images/icon_002.png" alt="share" />
                          </span>
                          Flag
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="btn_icon">
                            <img src="images/icon_004.png" alt="share" />
                          </span>
                          4 Comments
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0)"
                          onClick={() =>
                            handleLike(
                              val._id,
                              JSON.parse(localStorage.getItem('LogInUser'))._id,
                            )
                          }
                        >
                          <span className="btn_icon">
                            <img src="images/icon_003.png" alt="share" />
                          </span>
                          Likes
                        </a>
                      </li>
                      <div className="like_count" style={{ marginRight: 10 }}>
                        <span className="lft_cnt" />
                        <span
                          className="mid_cnt"
                          id={`likePost_${val._id}_${
                            JSON.parse(localStorage.getItem('LogInUser'))._id
                          }`}
                        >
                          {val?.like?.length}
                        </span>
                        <span className="rit_cnt" />
                      </div>
                      <li>
                        <a
                          href="javascript:void(0)"
                          onClick={() =>
                            handleUnLike(
                              val._id,
                              JSON.parse(localStorage.getItem('LogInUser'))._id,
                            )
                          }
                        >
                          <span className="btn_icon">
                            <img src="images/icon_003.png" alt="share" />
                          </span>
                          Unlike
                        </a>
                      </li>
                      <div className="like_count">
                        <span className="lft_cnt" />
                        <span
                          className="mid_cnt "
                          id={`unlikePost_${val._id}_${
                            JSON.parse(localStorage.getItem('LogInUser'))._id
                          }`}
                        >
                          {val.unlike.length}
                        </span>
                        <span className="rit_cnt" />
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))
        : ''}
    </>
  )
}
export default Post
