// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBj5b34RpLNaZ-23_DgMYBArDnX5iK_ajY",
  authDomain: "uas-pbo-d6f78.firebaseapp.com",
  projectId: "uas-pbo-d6f78",
  storageBucket: "uas-pbo-d6f78.firebasestorage.app",
  messagingSenderId: "738613472114",
  appId: "1:738613472114:web:141ce1049e432c86e04beb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export untuk digunakan di file lain
export { db, collection, addDoc, getDocs, query, orderBy, deleteDoc, doc };