import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { doc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
function Chat() {
  const [openEmoji, SetOpenEmoji] = useState(false);
  const [chats, setChats] = useState();
  const [text, SetText] = useState("");
  const{chatId}=useChatStore()
  const handleEmoji = (e) => {
    SetText((prev) => prev + e.emoji);
    SetOpenEmoji(false);
  };
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behaviur: "smooth" });
  }, []);
  useEffect(()=>{
    const unSub=onSnapshot(doc(db,"chats",chatId),(res)=>{
      setChats(res.data())
    })
    return (()=>unSub())
  },[chatId])
  console.log(chats);
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
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam
              voluptatum possimus quo, quas magnam vitae maiores, quae voluptas
              aperiam repellendus quidem error. Accusamus blanditiis eum error,
              architecto ratione animi odio.
            </p>
            <span>1min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam
              voluptatum possimus quo, quas magnam vitae maiores, quae voluptas
              aperiam repellendus quidem error. Accusamus blanditiis eum error,
              architecto ratione animi odio.
            </p>
            <span>1min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam
              voluptatum possimus quo, quas magnam vitae maiores, quae voluptas
              aperiam repellendus quidem error. Accusamus blanditiis eum error,
              architecto ratione animi odio.
            </p>
            <span>1min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam
              voluptatum possimus quo, quas magnam vitae maiores, quae voluptas
              aperiam repellendus quidem error. Accusamus blanditiis eum error,
              architecto ratione animi odio.
            </p>
            <span>1min ago</span>
          </div>
        </div>
        <div className="message own">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <img
              src="https://www.sportico.com/wp-content/uploads/2021/06/CristianoRonaldoJuventus_AP20287595970355-e1622763628281.jpg?w=1280&h=790&crop=1"
              alt=""
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam
              voluptatum possimus quo, quas magnam vitae maiores, quae voluptas
              aperiam repellendus quidem error. Accusamus blanditiis eum error,
              architecto ratione animi odio.
            </p>
            <span>1min ago</span>
          </div>
        </div>
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
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
}

export default Chat;
