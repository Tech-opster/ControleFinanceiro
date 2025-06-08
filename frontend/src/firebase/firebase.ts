// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Importe os serviços que vai usar, ex: autenticação

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoBaeTJoA3r89dsxmUBmaXWnMkkFJteEo",
  authDomain: "controlefinanceiro-7384c.firebaseapp.com",
  projectId: "controlefinanceiro-7384c",
  storageBucket: "controlefinanceiro-7384c.firebasestorage.app",
  messagingSenderId: "19904422281",
  appId: "1:19904422281:web:1907ae9570027d82310158"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)