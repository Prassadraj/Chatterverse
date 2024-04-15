import React, { useEffect, useState } from "react";
import "./details.css";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import { useChatStore } from "../../lib/chatStore";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

function Details() {
  const {
    chatId,
    user,
    isCurrentUserBlocked,
    changeBlocked,
    isReceiverBlocked,
  } = useChatStore();
  const { currentUser } = useUserStore();
  const [userChat, setUserChat] = useState([]);
  const [showPhotos, setShowPhotos] = useState(true); // State to control photo visibility

  const handleBlock = async (e) => {
    if (!user) return;
    const userDocRef = doc(db, "users", currentUser.id);
    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlocked();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setUserChat(res.data());
    });
  }, [chatId]);

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum, dolor sit amet</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img
              src="./arrowDown.png"
              alt=""
              onClick={() => setShowPhotos((prev) => !prev)}
            />
          </div>
          {showPhotos && ( // Conditionally render based on showPhotos state
            <div className="photos">
              {userChat?.messages?.map(
                (message) =>
                  message.img && (
                    <div className="photoItem" key={message?.createdAt}>
                      <div className="photoDetail">
                        <img src={message.img || "./avatar.png"} alt="" />
                        <span>Photo</span>
                      </div>
                      <img src="./download.png" alt="" />
                    </div>
                  )
              )}
            </div>
          )}
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "you Are Blocked"
            : isReceiverBlocked
            ? "User Blocked"
            : "Block User"}
        </button>
        <button className="logOut" onClick={() => auth.signOut()}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Details;
