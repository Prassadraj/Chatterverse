import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { arrayUnion, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { doc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
function Chat() {
  const [openEmoji, SetOpenEmoji] = useState(false);
  const [chats, setChats] = useState();
  const [text, SetText] = useState("");
  const { chatId, user } = useChatStore();
  const { currentUser } = useUserStore();
  const handleEmoji = (e) => {
    SetText((prev) => prev + e.emoji);
    SetOpenEmoji(false);
  };
  //behaviur: "smooth"
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behaviur: "smooth" });
  }, []);
  //storing chats data to setChats
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChats(res.data());
    });
    return () => unSub();
  }, [chatId]);

  const handleSend = async (e) => {
    // e.preventDefault();
    if (text === "") return;

    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser,
          text,
          createdAt: new Date(),
        }),
      });
      const userIDs = [currentUser.id, user.id];
      userIDs.forEach(async (id) => {
        const userChatRef = doc(db, "userChats", id);
        const userSnapChats = await getDoc(userChatRef);
        if (userSnapChats.exists()) {
          const userChatsData = userSnapChats.data();
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );
          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chat">
      {/* top */}

      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Neymar</span>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      {/* center */}

      <div className="center">
        {chats?.messages?.map((message) => (
          <div className="message own" key={message?.createdAt}>
            <img src="./avatar.png" alt="" />
            <div className="texts">
              {message.img && <img src={message.img} alt="" />}
              <p>{message.text}</p>
              {/* <span>{message.createdAt}</span> */}
            </div>
          </div>
        ))}
        <div className="" ref={endRef}></div>
      </div>

      {/* bottom */}
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          onChange={(e) => SetText(e.target.value)}
          placeholder="Typing..."
          value={text}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            onClick={() => SetOpenEmoji((prev) => !prev)}
            alt=""
          />
          <div className="picker">
            <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
