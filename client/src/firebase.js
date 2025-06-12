// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3LQ06LqvqDza86px7jei8-js0KN4M2EQ",
  authDomain: "hospital-eb247.firebaseapp.com",
  projectId: "hospital-eb247",
  storageBucket: "hospital-eb247.firebasestorage.app",
  messagingSenderId: "415953596831",
  appId: "1:415953596831:web:14bf3f9e4dd481fa574daa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;