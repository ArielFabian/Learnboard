import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA28orE08oYLCt0EV79b1AiLjUvuJourlU",
  authDomain: "learnboard-d2306.firebaseapp.com",
  projectId: "learnboard-d2306",
  storageBucket: "learnboard-d2306.appspot.com",
  messagingSenderId: "277297604892",
  appId: "1:277297604892:web:3b85d50eb6ae15951972d9",
  measurementId: "G-T51E7NWWS5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
