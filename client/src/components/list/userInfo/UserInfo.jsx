import React from 'react'
import './userInfo.scss'

function UserInfo() {
  return (
    <div className='userInfo'>
        <div className="user">
            <img src="./avatar.png" alt="" />
            <h2>Prassad Raj</h2>
        </div>
        <div className="icons">
            <img src="./more.png" alt="" />
            <img src="./video.png" alt="" />
            <img src="./edit.png" alt="" />
        </div>
    </div>
  )
}

export default UserInfo