// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBcIODcIVGpCMrkEBLf0yqxfJe100fCeeY",
	authDomain: "project5-83158.firebaseapp.com",
	projectId: "project5-83158",
	storageBucket: "project5-83158.firebasestorage.app",
	messagingSenderId: "870645849974",
	appId: "1:870645849974:web:081987d2e2f898464e6457",
	measurementId: "G-K7LJMBM2Y2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
