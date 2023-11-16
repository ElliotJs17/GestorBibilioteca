import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAcL9DZS1S7aY0ZH6QIZb9Ib7W_7xGsTIU",
    authDomain: "fisi-de17f.firebaseapp.com",
    projectId: "fisi-de17f",
    storageBucket: "fisi-de17f.appspot.com",
    messagingSenderId: "701022532447",
    appId: "1:701022532447:web:eaea1cb004fa9f96e9fcea"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export const db = getFirestore(appFirebase);

export default appFirebase;
