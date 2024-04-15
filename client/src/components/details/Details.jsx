import React from "react";
import "./details.css";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import { useChatStore } from "../../lib/chatStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
function Details() {
  const {
    chatId,
    user,
    isCurrentUserBlocked,
    changeBlocked,
    isReceiverBlocked,
  } = useChatStore();
  const { currentUser } = useUserStore();
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
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://www.sportico.com/wp-content/uploads/2021/06/CristianoRonaldoJuventus_AP20287595970355-e1622763628281.jpg?w=1280&h=790&crop=1"
                  alt=""
                />
                <span>Ronaldo.png</span>
              </div>
              <img src="./download.png" alt="" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://www.sportico.com/wp-content/uploads/2021/06/CristianoRonaldoJuventus_AP20287595970355-e1622763628281.jpg?w=1280&h=790&crop=1"
                  alt=""
                />
                <span>Ronaldo.png</span>
              </div>
              <img src="./download.png" alt="" />
            </div>
          </div>
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
