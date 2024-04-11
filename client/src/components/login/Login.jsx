import React from "react";
import "./login.css";

function Login() {
  return (
    <div className="login">
      <div className="item">
        <h2>Welcome back,</h2>
        <form>
          <input type="text" placeholder="Email" name="email"/>
          <input type="password" placeholder="Password" name="password"/>
          <button>Sign In</button>
        </form>
      </div>
      <div className="separate"></div>
      <div className="item">
      <form>
        <label htmlFor="file">
            <img src="" alt="" /> Upload an Image</label>
        <input type="file" id="file" style={{display:"none"}} />
          <input type="text" placeholder="UserName" name="username"/>
          <input type="email" placeholder="Email" name="email"/>
          <input type="password" placeholder="Password" name="password"/>
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
