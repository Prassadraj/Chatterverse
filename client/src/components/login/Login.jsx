import React, { useState } from "react";
import "./login.css";

function Login() {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  const handleClick = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  return (
    <div className="login">
      <div className="item">
        <h2>Welcome back,</h2>
        <form>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button>Sign In</button>
        </form>
      </div>
      <div className="separate"></div>
      <div className="item">
        <form>
          <label htmlFor="file">
            <img src={avatar.url||'../avatar.png'} alt="" /> Upload an Image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleClick}
          />
          <input type="text" placeholder="Username" name="username" />
          <input type="email" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
