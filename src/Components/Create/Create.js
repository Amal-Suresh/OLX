import React, { Fragment, useState ,useContext} from 'react';
import './Create.css';
import Header from '../Header/Header';
import { ref,uploadBytes,getDownloadURL } from "firebase/storage";
import { collection, addDoc } from 'firebase/firestore';
import { FirebaseContext,AuthContext } from '../../store/FirebaseContext';
import { useNavigate } from "react-router-dom";


const Create =  () => {

  const {db,storage}=useContext(FirebaseContext)
  const{user}=useContext(AuthContext)


  const [name,setName]=useState("")
  const [category,setCategory]=useState("")
  const [price,setPrice]=useState("")
  const [pImage,setPimage]=useState(null)
  const navigate=useNavigate()
  const date =new Date()

  const handleInput=async(e)=>{
    e.preventDefault()
    const imageRef = ref(storage, `/images/${pImage.name}`);
    await uploadBytes(imageRef, pImage);
  
    // Get the download URL of the uploaded image
    const imageUrl = await getDownloadURL(imageRef);

    await addDoc(collection(db, 'products'), {
      name,
      category,
      price,
      imageUrl,
      userId: user.uid,
      createdAt:date.toDateString()

    });
  
    navigate('/')
  }



  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              onChange={(e)=>{
                setName(e.target.value)
              }}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              onChange={(e)=>{
                setCategory(e.target.value)
              }}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
             className="input"
              type="number" 
              onChange={(e)=>{
                setPrice(e.target.value)
              }}
              id="fname"
               name="Price" />
            <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={pImage? URL.createObjectURL(pImage):''}></img>
            <br />
            <input onChange={(e)=>{
              setPimage(e.target.files[0])
            }}   type="file" /> 
            <br />
            <button onClick={handleInput} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
