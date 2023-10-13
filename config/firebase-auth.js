import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBe6HPv0IGBOuCPcGdq5zEs72l1hvOJqcM",
  authDomain: "db-crustopia.firebaseapp.com",
  projectId: "db-crustopia",
  storageBucket: "db-crustopia.appspot.com",
  messagingSenderId: "740090356702",
  appId: "1:740090356702:web:3b861f9c85947f7f08734f",
  measurementId: "G-LD1CLWN8TM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);