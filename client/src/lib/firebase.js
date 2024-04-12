import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "wechat-b90e3.firebaseapp.com",
  projectId: "wechat-b90e3",
  storageBucket: "wechat-b90e3.appspot.com",
  messagingSenderId: "661142366942",
  appId: "1:661142366942:web:e284a682ffd8a1c6d7f04f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
