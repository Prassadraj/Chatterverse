import React, { useState } from 'react'
import './chatList.css'
function ChatList() {
  const [addMode,setAddMode]=useState(false)
  return (
    <div className='chatList'>
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder='Search' />
        </div>
        <img className='add' src={addMode?"./minus.png":"./plus.png"} 
        onClick={()=>setAddMode((prev)=>!prev)} alt="" />
      </div>
    </div>
  )
}

export default ChatList