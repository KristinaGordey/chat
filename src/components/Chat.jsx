import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import EmojiPicker from "emoji-picker-react";

import icon from  "../images/smile.png"
import styles from "../styles/main.css";
import Messages  from './Messages';


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
  const handleSubmit =(e)=>{
    e.preventDefault();
    if(!message) return;
    socket.emit('sendMessage',{message, params});
    setMessage("");
  };
  const onEmojiClick =({emoji})=>setMessage(`${message} ${emoji}`);

  return (
    <><header className='header'>
        <h2 className="header__title header__title-chat">
          <span>Chat name</span>
          
          <div className={styles.users}>
           0 users in this room
         </div>
        </h2>
      </header>
    <main className='content'>
      <h1 className='visually-hidden'>Chat</h1>
      <section className='messages container'>
      <h2 className='visually-hidden'>Messages area</h2>
      <div className="messages__area">
        <div className={styles.messages}>
            <Messages messages ={state} name={params.name} />
            </div>
        </div>
      <div className="message__enter contain">
        <form className="message__enter-form" onSubmit={handleSubmit}>
            <label htmlFor="message-input" className='visually-hidden'>Message</label>
            <input type="text" id='message-input' className="message__enter-input input" placeholder='What do you want to say?' value={message} onChange={handleChange} />
            <button title='input' className='message__enter-button' type='submit'>
              <span className="visually-hidden">Send message</span>
            </button>
        </form>
      </div> 
      </section>
    </main> 
    <footer> 
    </footer>
   </>



    // <div className={styles.wrap}>
    //   <div className={styles.header}>
    //     <div className={styles.title}>
    //        Chat Name
    //     </div>
    //     <div className={styles.users}>
    //       0 users in this room
    //     </div>
    //     <button className={styles.left} onClick={leftRoom}>
    //       Left the room
    //     </button>
    //   </div>
     //  <Messages messages ={state} name={params.name} />
    //   <form className ={styles.form}>
    //     <div className={styles.input}>
    //   <input type="text" name="message" placeholder='What do you want to say?' value={message} onChange={handleChange} autoComplete="off" required />
    //   </div>

    //   <div className={styles.emoji}>
    //     <img src ={icon} alt ="" onClick={()=> setOpen(!isOpen)} />

    //     {isOpen &&(
    //        <div className={styles.emojies}>
    //        <EmojiPicker onEmojiClick={onEmojiClick}/>
 
    //      </div>
    //     )}
    //     </div>
    //     <div className={styles.button}> 
    //       <input type="submit" onSubmit={handleSubmit} value="Send a message"/>
    //     </div>   
    //   </form>
    // </div>
    
  )
  
}

export default Chat;
