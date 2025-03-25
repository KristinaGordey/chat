import React, { useState } from 'react';
// import styles from '..//styles/Main.module.css'
import {Link} from 'react-router-dom'
import "../styles/main.css";


const FIELDS = {
  USERNAME: "username",
  PASSWORD: "password"
}

const Main = () => {
  const {USERNAME, PASSWORD} = FIELDS;
  const  [values, setValues] = useState({[USERNAME]:"", [PASSWORD]:""});

  const handleChange = ({ target: {value, name}})=>{
    setValues({...values, [name]:value});
  };

  const handleClick = (e) => {
    const isDisabled = Object.values(values).some((v) => !v);

    if(isDisabled) e.preventDefault();
  };


  console.log(values);

  return (
    <><header className='header'>
      <h2 className="header-title">Chat name</h2>
    </header>
    <main className='content'>
      <h1 className='visually-hidden'>Chat</h1>
      <section className='enter container'>
      <h2 className='visually-hidden'>Enter login and password form</h2>
          <div className='enter-body container'>
              <form className='enter-form'>
                <div className='enter-form-body'>
                  <div className='enter-form-field'>
                    <label className='enter-form-title' htmlFor="login">Login</label>
                    <input type="text" id='login' name="username" value={values[USERNAME]} className='enter-form-input input' onChange={handleChange} autoComplete="off" required />
                  </div>
                  <div className='enter-form-field'> 
                    <label className='enter-form-title' htmlFor="password">Password</label>
                    <input type="text" id='password' name="password" value={values[PASSWORD]} className='enter-form-input input' onChange={handleChange} autoComplete="off" required />
                  </div>  
                    <Link className='link' onClick={handleClick} to={`/chat?name=${values[USERNAME]}&password=${values[PASSWORD]}`}>
                    <button type="submit" className ="enter-form-button">Login
                    </button>
                  </Link>
                </div>  
              </form>
          </div>
      </section>
    </main>
    <footer></footer>
   </>)
  
};

export default Main;
