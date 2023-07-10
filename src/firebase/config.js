
import {initializeApp} from  "firebase/app";
import {getFirestore} from "firebase/firestore";
import 'firebase/auth'
import {getStorage} from 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDB1YU8oBFZDhY1D7VZRNs-BqwN2RjzYxU",
    authDomain: "olxclone-7b363.firebaseapp.com",
    projectId: "olxclone-7b363",
    storageBucket: "olxclone-7b363.appspot.com",
    messagingSenderId: "832793151725",
    appId: "1:832793151725:web:4c66051725086d49cfe4e4",
    measurementId: "G-XRGJH80D35"
  };

 export const Firebaseapp =initializeApp(firebaseConfig)
 export const storage =getStorage(Firebaseapp)
 export const db =getFirestore(Firebaseapp)

