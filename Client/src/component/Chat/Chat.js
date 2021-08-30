import React, { useEffect, useState } from 'react'
import { user } from "../Join/Join";
import socketIo from "socket.io-client";
import "./Chat.css";
import sendLogo from "../../images/send.png";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";
  import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
let socket;

const ENDPOINT = "https://lets-chat.herokuapp.com/";

const Chat = () => {
    const [id, setid] = useState("");
    const [messages, setMessages] = useState([])

    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id });
        document.getElementById('chatInput').value = "";
    }

    console.log(messages);
    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            toast.success('Welcome to Lets-we-chat');
            setid(socket.id);

        })
        console.log(socket);
        socket.emit('joined', { user })

        socket.on('welcome', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })

        socket.on('userJoined', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })

        socket.on('leave', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message)
        })

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [])

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message, data.id);
        })
        return () => {
            socket.off();
        }
    }, [messages])

    return (
      <div>

        <div className="chatPage">
          <div className="chatContainer">
            <div className="header">
              <h2> Lets-we-CHAT</h2>
              <a href="/">
                {" "}
                <img src={closeIcon} alt="Close" />
              </a>
            </div>
            <ReactScrollToBottom className="chatBox">
              {messages.map((item, i) => (
                <Message
                  user={item.id === id ? "" : item.user}
                  message={item.message}
                  classs={item.id === id ? "right" : "left"}
                />
              ))}
            </ReactScrollToBottom>
            <div className="inputBox">
              <input
                onKeyPress={(event) => (event.key === "Enter" ? send() : null)}
                type="text"
                id="chatInput"
                placeholder="Enter your Message"
              />
              <Button variant="contained" style={{backgroundColor:"green",color:"white"}}onClick={send} className="sendBtn">
                <SendIcon/>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Chat
