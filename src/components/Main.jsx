import React, { useState } from 'react';
import styles from '..//styles/Main.module.css'
import {Link} from 'react-router-dom'



const FIELDS = {
  USERNAME: "username",
  PASSWORD: "password"
}

const Main = () => {
  const {USERNAME, PASSWORD} = FIELDS;
  const  [values, setValues] = useState({[USERNAME]:"", [PASSWORD]:""});
  const handleChange = ({ target: {value, name}})=>{
    setValues({...values, [name]:value});
  }
  //console.log(values);

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <h1 className={styles.heading}>JOIN</h1>
        <form className={styles.form}>
          <div className={styles.group}>
            <h4>Login</h4>
            <input type="text" name="username" value={values[USERNAME]} className={styles.input} onChange={handleChange} autoComplete="off" required/>
            <h4>Password</h4>
            <input type="text" name="password" value={values[PASSWORD]} className={styles.input} onChange={handleChange} autoComplete="off" required/>
        
          </div>
          <Link to={`/chat?name=${values[USERNAME]}&password=${values[PASSWORD]}`}>
          <button type="submit" className={styles.button}>Login

          </button>
        </Link>
        </form>
      </div>
    </div>)
  
};

export default Main;
