import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA6T21NpWBns1U2tT5R3TKP85Mh2712-r0",
  authDomain: "lockedin-88dd7.firebaseapp.com",
  databaseURL: "https://lockedin-88dd7-default-rtdb.firebaseio.com",
  projectId: "lockedin-88dd7",
  storageBucket: "lockedin-88dd7.appspot.com",
  messagingSenderId: "264306491964",
  appId: "1:264306491964:web:f677f0449ad6381d4fb939",
  measurementId: "G-MBKS9N01V2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword };
