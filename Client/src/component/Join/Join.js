import React, { useState } from 'react'
import "./Join.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Marquee from "react-fast-marquee";

let user;
const sendUser = () => {
    user = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value = "";
}


const Join = () => {

    const [name, setname] = useState("");

    return (
      <div>
       
        <Marquee
          speed="120"
          gradient={false}
          style={{ zIndex: "99", background: "gold", height: "40px" }}
        >
          Welcome to Chat Application, Enjoy ur talks !!
        </Marquee>

        <div className="JoinPage">
          <div className="JoinContainer">
            <img
              src="https://www.kindpng.com/picc/m/48-482811_wechat-icon-transparent-hd-png-download.png"
              alt="logo"
            />
            <h1>Lets -we- Chat</h1>
            <input
              onChange={(e) => setname(e.target.value)}
              placeholder="Enter Your Name"
              type="text"
              id="joinInput"
            />
            <Link
              onClick={(event) => (!name ? event.preventDefault() : null)}
              to="/chat"
            >
              {" "}
              <Button
                variant="contained"
                fontSize="large"
                style={{ borderRadius: "40px", height: "50px" }}
                color="secondary"
                onClick={sendUser}
                className="joinbtn"
              >
                Login In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
}

export default Join
export { user }
