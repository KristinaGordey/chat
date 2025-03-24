import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import EmojiPicker from "emoji-picker-react";

import icon from  "../images/smile.png"
import styles from "../styles/main.css";


const socket = io.connect("http://localhost:5000");

const Chat = () => {
  const [state, setState]= useState([]);
  const {search} = useLocation();
  const [params, setParams]=useState({room: "",user: "" });
  const [message, setMessage]= useState("");
  const [isOpen, setOpen]=useState(false);

  useEffect(()=>{
    const searchParams= Object.fromEntries(new URLSearchParams(search))
    setParams(searchParams)
    socket.emit('join', searchParams);

  },[search]);

  useEffect(()=>{
    socket.on('message', ({data})=>{
      setState((_state) => [..._state,data]);
      

    })

  },[]);
  console.log(state);
  
  const leftRoom =()=>{};
  const handleChange =({target:{value}})=>setMessage(value);
  const handleSubmit =()=>{};
  const onEmojiClick =({emoji})=>setMessage(`${message} ${emoji}`);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.title}>
           Chat Name
        </div>
        <div className={styles.users}>
          0 users in this room
        </div>
        <button className={styles.left} onClick={leftRoom}>
          Left the room
        </button>
      </div>
      <div className={styles.messages}>
        {state.map(({message}, i)=><span key={i}>{message}</span>)}

      </div>
      <form className ={styles.form}>
        <div className={styles.input}>
      <input type="text" name="message" placeholder='What do you want to say?' value={message} onChange={handleChange} autoComplete="off" required />
      </div>

      <div className={styles.emoji}>
        <img src ={icon} alt ="" onClick={()=> setOpen(!isOpen)} />

        {isOpen &&(
           <div className={styles.emojies}>
           <EmojiPicker onEmojiClick={onEmojiClick}/>
 
         </div>
        )}
        </div>
        <div className={styles.button}> 
          <input type="submit" onSubmit={handleSubmit} value="Send a message"/>
        </div>   
      </form>
    </div>
    
  )
  
}

export default Chat;
