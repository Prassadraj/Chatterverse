import React, { useEffect, useState } from "react";
import "./chatList.css";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../lib/userStore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";
function ChatList() {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const { currentUser } = useUserStore();
  const { changeChat,chatId } = useChatStore();
  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userChats", currentUser.id),
      async (res) => {
        const items = res.data().chats;
        const promises = items.map(async (item) => {
          const userdocRef = doc(db, "users", item.receiverId);
          const userdocSnap = await getDoc(userdocRef);
          const user = userdocSnap.data();
          // console.log(user);
          return { ...item, user };
        });
        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );
    return () => unSub();
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    changeChat(chat.chatId, chat.user);
  };
  //  console.log(chats);

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          className="add"
          src={addMode ? "./minus.png" : "./plus.png"}
          onClick={() => setAddMode((prev) => !prev)}
          alt=""
        />
      </div>
      {chats.map((chat) => (
        <div
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          className="item"
        >
          <img src={chat.user.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{chat.user.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}
      {addMode ? <AddUser /> : ""}
    </div>
  );
}

export default ChatList;
