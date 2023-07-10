import React, { useContext, useState } from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/FirebaseContext'; 
import { createUserWithEmailAndPassword, getAuth,updateProfile } from "firebase/auth";
import {collection, addDoc} from 'firebase/firestore'
import { useNavigate } from "react-router-dom";



export default function Signup() {

  const [username,setUsername]=useState("")
  const [password,setPassaword]=useState("")
  const [email,setEmail]=useState("")
  const [phone,setPhone]=useState("")
  const navigate=useNavigate()
  const {Firebaseapp,db}=useContext(FirebaseContext)

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const auth = getAuth(Firebaseapp);
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        updateProfile(user, {displayName: username});
  
        addDoc(collection(db, "users"), {
          id: userCredential.user.uid,
          email,
          password,
          phone,
          username,
        });
  
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.code);
        alert(err.code);
      });
  };
    
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='olxLogo'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            onChange={(e)=>{
              setUsername(e.target.value)
            }}
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            
            onChange={(e)=>{
              setPhone(e.target.value)
            }}
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
           
           onChange={(e)=>{
            setPassaword(e.target.value)
           }}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button type='submit'>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
