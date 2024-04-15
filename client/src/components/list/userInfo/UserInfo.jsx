import React, { useState } from 'react'
import './userInfo.scss'
import { useUserStore } from '../../../lib/userStore'

function UserInfo() {
  const{currentUser}=useUserStore()
  const [showLogout, setShowLogout] = useState(false);
  const handleMoreClick = () => {
    setShowLogout(!showLogout);
  };
  const handleLogout = () => {
    // Add logout functionality here
  };
  return (
    <div className='userInfo'>
      <div className="user">
        <img src={currentUser.avatar || "./avatar.png"} alt='' />
        <h2>{currentUser.username}</h2>
      </div>
      <div className="icons">
        <img
          src="./more.png"
          alt=""
          onClick={handleMoreClick}
        />
        <img src="./video.png" alt="" />
        <img src="./edit.png" alt="" />
      </div>
      {showLogout && (
        <button className="logOut" onClick={handleLogout}>
          Log Out
        </button>
      )}
    </div>

  )
}

export default UserInfo