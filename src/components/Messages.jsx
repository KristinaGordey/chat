import React from "react";

import  "../styles/main.css";


const Messages = ({messages, name}) => {
    console.log("Messages array:", messages);
    return (
        <div className = 'messages__area'> 
        {messages.map(({user,message},i)=>{
            const itsMe = user.name.trim().toLowerCase()===name.trim().toLowerCase();
            const className = itsMe ? 'me': 'user';
            return(
                <div key={i} className={`message__body ${className}`}>
                    <span className= 'message__user-name'>
                        {user.name}
                    </span>
                    <div className= 'message__text'>{message}</div>
                </div>
                
            )
        })}
        </div>
    )
}

export default Messages;