// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCOATSW02Hp1yXAlwE8RXuDdl167_DOA4",
  authDomain: "humer-ac758.firebaseapp.com",
  projectId: "humer-ac758",
  storageBucket: "humer-ac758.appspot.com",
  messagingSenderId: "729013000135",
  appId: "1:729013000135:web:d0bae64bb34bc7bdcf2be2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};