import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import config from '../cofig'
function Categories(props) {
  const [category, setcategory] = useState([])

  const handle = (val) => {
    console.log('sjkkkk', val)
    axios({
      method: 'post',
      data: { search: val },
      withCredentials: true,
      url: `${config.SERVER_URL}/filterPost`,
    })
      .then((result) => {
        props.setresultAllPost(result.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      <div className="rght_cate">
        <div className="rght_cate_hd" id="rght_cat_bg">
          Categories
        </div>
        <div className="rght_list" style={{ display: 'block' }}>
          <ul>
            <li>
              <a href="#" value="CATS" onClick={() => handle('Cat')}>
                <span className="list_icon">
                  <img src="images/icon_01.png" alt="up" />
                </span>{' '}
                CATS
              </a>
            </li>
            <li>
              <a href="#" value="Dogs" onClick={() => handle('Dog')}>
                <span className="list_icon">
                  <img src="images/icon_02.png" alt="up" />
                </span>{' '}
                Dogs
              </a>
            </li>
            <li>
              <a href="#" value="Birds" onClick={() => handle('Bird')}>
                <span className="list_icon">
                  <img src="images/icon_03.png" alt="up" />
                </span>{' '}
                Birds
              </a>
            </li>
            <li>
              <a href="#" value="Rabbit" onClick={() => handle('Rabbit')}>
                <span className="list_icon">
                  <img src="images/icon_04.png" alt="up" />
                </span>{' '}
                Rabbit
              </a>
            </li>
            <li>
              <a href="#" value="Others" onClick={() => handle('Other')}>
                <span className="list_icon">
                  <img src="images/icon_05.png" alt="up" />
                </span>{' '}
                Others
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Categories
