import React, { useState,useContext} from 'react';
import {FirebaseContext} from '../../store/FirebaseContext'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";


import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {

  const[username,setUsername]=useState("")
  const[password,setPassword]=useState("")
  const {Firebaseapp}=useContext(FirebaseContext)
  const navigate=useNavigate()

  const handleSubmit=(e)=>{

    e.preventDefault()
   
    const auth = getAuth(Firebaseapp);
    signInWithEmailAndPassword(auth, username, password)
  .then(() => {
    // Signed in 
    navigate("/");

    
    // ...
  })
  .catch((error) => {
    console.log( error.code);
    console.log(   error.message);
  });
   
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={(e)=>{
              setUsername(e.target.value)
            }}
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
          />
          <br />
          <br />
          <button type='submit'>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
