// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth }          from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getDatabase , ref , get  } from 'firebase/database'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCu5aD-MHNhLfVnJmEQCTgqs5jhaTZ9z54",
  authDomain: "savesphere-a38d8.firebaseapp.com",
  projectId: "savesphere-a38d8",
  storageBucket: "savesphere-a38d8.appspot.com",
  messagingSenderId: "105801267685",
  appId: "1:105801267685:web:ff354928f3c3f4425ed70c",
  measurementId: "G-9TJ3YT5ZTF"
};

// new
// const firebaseConfig = {
//   apiKey: "AIzaSyDK2PgbbJMigLV2CCJti3DmR64ZFHLiRZc",
//   authDomain: "expense-tracker-505c0.firebaseapp.com",
//   projectId: "expense-tracker-505c0",
//   storageBucket: "expense-tracker-505c0.appspot.com",
//   messagingSenderId: "468243974934",
//   appId: "1:468243974934:web:a072974a2ab2535033de37",
//   measurementId: "G-FR18P5YTSD"
// };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
export const realtimeDB = getDatabase(app);
// const analytics = getAnalytics(app);
export default app;